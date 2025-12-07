// src/pages/TransaksiPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function TransaksiPage() {
  const [barangList, setBarangList] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bayar, setBayar] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("cash");
  const [submitting, setSubmitting] = useState(false);

  // Ambil daftar barang
  useEffect(() => {
    api
      .get("/barang")
      .then((res) => {
        setBarangList(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load barang:", err);
        alert("Gagal memuat daftar barang. Cek koneksi backend.");
        setLoading(false);
      });
  }, []);

  // Hitung total
  const total = keranjang.reduce((sum, item) => sum + item.total, 0);
  const kembalian = parseFloat(bayar) > total ? parseFloat(bayar) - total : 0;

  // Tambah barang ke keranjang
  const tambahKeKeranjang = (barangId) => {
    const barang = barangList.find((b) => b._id === barangId);
    if (!barang) return;
    if (barang.stok <= 0) {
      alert(`Stok ${barang.nama} habis!`);
      return;
    }

    let hargaSatuan = 0;
    if (barang.typeHarga === "fixed") {
      hargaSatuan = barang.harga;
    } else {
      hargaSatuan = Math.round((barang.hargaMin + barang.hargaMax) / 2);
    }

    const newItem = {
      _id: barang._id,
      nama: barang.nama,
      hargaSatuan,
      jumlah: 1,
      total: hargaSatuan,
    };

    const existingIndex = keranjang.findIndex((k) => k._id === newItem._id);
    if (existingIndex >= 0) {
      const updated = [...keranjang];
      updated[existingIndex].jumlah += 1;
      updated[existingIndex].total = updated[existingIndex].hargaSatuan * updated[existingIndex].jumlah;
      setKeranjang(updated);
    } else {
      setKeranjang([...keranjang, newItem]);
    }
  };

  // Ubah jumlah
  const ubahJumlah = (index, delta) => {
    const updated = [...keranjang];
    const item = updated[index];
    const newJumlah = item.jumlah + delta;
    if (newJumlah <= 0) return;

    const barang = barangList.find((b) => b._id === item._id);
    if (barang && newJumlah > barang.stok) {
      alert(`Stok hanya ${barang.stok} untuk ${barang.nama}`);
      return;
    }

    updated[index].jumlah = newJumlah;
    updated[index].total = item.hargaSatuan * newJumlah;
    setKeranjang(updated);
  };

  // Hapus item
  const hapusItem = (index) => {
    const updated = [...keranjang];
    updated.splice(index, 1);
    setKeranjang(updated);
  };

  // Kirim transaksi
  const handleBayar = async () => {
    if (keranjang.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    if (parseFloat(bayar) < total) {
      alert("Uang bayar kurang!");
      return;
    }

    setSubmitting(true);
    const payload = {
      items: keranjang.map((item) => ({
        barang: item._id,
        qty: item.jumlah,
        harga: item.hargaSatuan,
      })),
      total,
      metodePembayaran,
      bayar: parseFloat(bayar),
      kembalian,
    };

    try {
      await api.post("/transaksi", payload);
      alert("✅ Transaksi berhasil! Nota telah disimpan.");
      // Reset
      setKeranjang([]);
      setBayar("");
      setMetodePembayaran("cash");
    } catch (err) {
      alert("❌ Gagal menyimpan transaksi. Cek backend.");
    } finally {
      setSubmitting(false);
    }
  };

  // Cetak nota
  const printNota = () => {
    const tanggal = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const tanggalFormat = tanggal.toLocaleDateString('id-ID', options);
    const notaID = `NOTA-${Date.now()}`;

    const notaHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nota - ${notaID}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Courier New', monospace;
      width: 80mm;
      margin: 0 auto;
      padding: 10px;
      font-size: 12px;
    }
    .header {
      text-align: center;
      border-bottom: 2px dashed #000;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .header h1 { font-size: 18px; margin-bottom: 5px; font-weight: bold; }
    .header p { font-size: 11px; margin: 2px 0; }
    .info { margin-bottom: 10px; font-size: 11px; }
    .items {
      border-bottom: 2px dashed #000;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .item { margin-bottom: 8px; }
    .item-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-weight: bold;
    }
    .item-detail {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      padding-left: 10px;
    }
    .total {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 2px solid #000;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .payment-info {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #000;
      font-size: 11px;
    }
    .payment-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    .footer {
      text-align: center;
      margin-top: 15px;
      padding-top: 10px;
      border-top: 2px dashed #000;
      font-size: 11px;
    }
    .print-btn {
      position: fixed;
      top: 10px;
      right: 10px;
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-family: Arial, sans-serif;
      z-index: 1000;
    }
    .print-btn:hover { background: #45a049; }
    @media print {
      body { width: 100%; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">🖨️ Cetak Nota</button>
  
  <div class="header">
    <h1>TOKO BU ANA</h1>
    <p>Desa Rejosari, Dukuh Kepangen</p>
    <p>RT 5 RW 1, Jalan Bareng Colo</p>
  </div>
  
  <div class="info">
    <div>No. Nota: <strong>${notaID}</strong></div>
    <div>Tanggal: ${tanggalFormat}</div>
  </div>
  
  <div class="items">
    ${keranjang.map(item => `
      <div class="item">
        <div class="item-row">
          <span>${item.nama}</span>
        </div>
        <div class="item-detail">
          <span>${item.jumlah} x Rp ${item.hargaSatuan.toLocaleString('id-ID')}</span>
          <span>Rp ${item.total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `).join('')}
  </div>
  
  <div class="total">
    <div class="total-row">
      <span>TOTAL:</span>
      <span>Rp ${total.toLocaleString('id-ID')}</span>
    </div>
    <div class="payment-info">
      <div class="payment-row">
        <span>Pembayaran:</span>
        <span>Rp ${parseFloat(bayar).toLocaleString('id-ID')}</span>
      </div>
      <div class="payment-row">
        <span>Kembalian:</span>
        <span>Rp ${kembalian.toLocaleString('id-ID')}</span>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <p>Terima kasih atas kunjungan Anda!</p>
    <p>Barang yang sudah dibeli tidak dapat dikembalikan</p>
    <p>═══════════════════════════</p>
  </div>
</body>
</html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(notaHTML);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <>
        <Navbar title="KASIR" showBack />
        <div style={{ padding: "20px" }}>Loading daftar barang...</div>
      </>
    );
  }

  return (
    <>
      <Navbar title="KASIR" showBack />

      <div style={{ display: "flex", height: "calc(100vh - 60px)", fontFamily: "Arial" }}>
        {/* Sidebar Kiri: Daftar Barang */}
        <div
          style={{
            width: "220px",
            backgroundColor: "#f0f0f0",
            padding: "15px",
            borderRight: "1px solid #ccc",
            overflowY: "auto",
          }}
        >
          <h3 style={{ margin: "0 0 10px" }}>Daftar Barang</h3>
          {barangList.map((barang) => (
            <button
              key={barang._id}
              onClick={() => tambahKeKeranjang(barang._id)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                margin: "4px 0",
                backgroundColor: "#e0e0e0",
                border: "none",
                borderRadius: "4px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              disabled={barang.stok <= 0}
            >
              {barang.nama} ({barang.stok})
            </button>
          ))}
        </div>

        {/* Tengah: Keranjang */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <h2>🛒 Keranjang</h2>
          {keranjang.length === 0 ? (
            <p>Pilih barang dari daftar sebelah kiri.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={thStyle}>Barang</th>
                  <th style={thStyle}>Harga</th>
                  <th style={thStyle}>Jumlah</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {keranjang.map((item, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>{item.nama}</td>
                    <td style={tdStyle}>Rp {item.hargaSatuan.toLocaleString()}</td>
                    <td style={tdStyle}>
                      <button onClick={() => ubahJumlah(idx, -1)} style={btnQty}>-</button>
                      {item.jumlah}
                      <button onClick={() => ubahJumlah(idx, 1)} style={btnQty}>+</button>
                    </td>
                    <td style={tdStyle}>Rp {item.total.toLocaleString()}</td>
                    <td style={tdStyle}>
                      <button onClick={() => hapusItem(idx)} style={btnHapus}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Kanan: Pembayaran */}
        <div
          style={{
            width: "300px",
            backgroundColor: "#6c9ed7",
            padding: "20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2>💰 Pembayaran</h2>

          <div style={rowStyle}>
            <span>Total:</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>

          <div style={rowStyle}>
            <label>Bayar:</label>
            <input
              type="number"
              value={bayar}
              onChange={(e) => setBayar(e.target.value)}
              placeholder="0"
              style={inputBayar}
            />
          </div>

          <div style={rowStyle}>
            <label>Metode:</label>
            <select
              value={metodePembayaran}
              onChange={(e) => setMetodePembayaran(e.target.value)}
              style={selectStyle}
            >
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          <div style={rowStyle}>
            <span>Kembalian:</span>
            <span>Rp {kembalian.toLocaleString()}</span>
          </div>

          <button
            onClick={handleBayar}
            disabled={submitting || keranjang.length === 0}
            style={{
              ...btnBayar,
              backgroundColor: submitting ? "#6c757d" : "#28a745",
            }}
          >
            {submitting ? "Menyimpan..." : "Bayar"}
          </button>

          <button
            onClick={printNota}
            disabled={keranjang.length === 0}
            style={{
              ...btnCetak,
              opacity: keranjang.length === 0 ? 0.5 : 1,
            }}
          >
            Cetak Nota
          </button>
        </div>
      </div>
    </>
  );
}

// === Styling ===
const thStyle = { padding: "8px", textAlign: "left" };
const tdStyle = { padding: "8px", textAlign: "left", verticalAlign: "middle" };
const btnQty = {
  width: "24px",
  height: "24px",
  margin: "0 5px",
  borderRadius: "4px",
  backgroundColor: "#ddd",
  border: "none",
  cursor: "pointer",
};
const btnHapus = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer",
};
const rowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const inputBayar = {
  width: "120px",
  padding: "5px",
  borderRadius: "4px",
  border: "none",
};
const selectStyle = {
  width: "120px",
  padding: "5px",
  borderRadius: "4px",
  border: "none",
};
const btnBayar = {
  padding: "10px",
  borderRadius: "4px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};
const btnCetak = {
  padding: "10px",
  borderRadius: "4px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#ffc107",
  color: "#000",
};