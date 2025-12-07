// src/pages/RekapPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function RekapPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const [tahun, setTahun] = useState(currentYear.toString());
  const [bulan, setBulan] = useState(currentMonth);
  const [rekap, setRekap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Daftar bulan & tahun
  const bulanList = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const tahunList = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  // Fetch data rekap
  useEffect(() => {
    const fetchRekap = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/rekap?bulan=${bulan}&tahun=${tahun}`);
        setRekap(res.data);
      } catch (err) {
        console.error("Gagal load rekap:", err);
        setError("Gagal memuat laporan. Pastikan backend jalan.");
        setRekap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRekap();
  }, [bulan, tahun]);

  if (loading) {
    return (
      <>
        <Navbar title="REKAP KEUANGAN" showBack />
        <div style={{ padding: "20px" }}>Loading laporan...</div>
      </>
    );
  }

  // Hitung rata-rata jika belum dikirim backend
  const rataRata = rekap?.totalTransaksi > 0
    ? Math.round(rekap.totalPendapatan / rekap.totalTransaksi)
    : 0;

  return (
    <>
      <Navbar title="REKAP KEUANGAN" showBack />

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        {/* Filter Bulan & Tahun */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div>
            <label>Bulan:</label>
            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              style={{ marginLeft: "5px", padding: "2px" }}
            >
              {bulanList.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tahun:</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              style={{ marginLeft: "5px", padding: "2px" }}
            >
              {tahunList.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ringkasan */}
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : rekap ? (
          <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <div style={cardStyle}>
              <div style={labelCard}>Total Transaksi</div>
              <div style={valueCard}>{rekap.totalTransaksi}</div>
            </div>
            <div style={cardStyle}>
              <div style={labelCard}>Total Pendapatan</div>
              <div style={valueCard}>Rp {rekap.totalPendapatan.toLocaleString()}</div>
            </div>
            <div style={cardStyle}>
              <div style={labelCard}>Rata-rata/Transaksi</div>
              <div style={valueCard}>Rp {rataRata.toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <p>Tidak ada data untuk periode ini.</p>
        )}

        {/* Tabel Harian (opsional) */}
        {rekap?.transaksiPerHari?.length > 0 && (
          <div style={{ marginTop: "25px" }}>
            <h3 style={{ marginBottom: "10px" }}>📊 Detail Harian</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#6c9ed7", color: "white" }}>
                  <th style={thStyle}>Tanggal</th>
                  <th style={thStyle}>Transaksi</th>
                  <th style={thStyle}>Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {rekap.transaksiPerHari.map((hari, idx) => (
                  <tr key={idx} style={{ backgroundColor: "#f9f9f9" }}>
                    <td style={tdStyle}>
                      {new Date(hari.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td style={tdStyle}>{hari.jumlah}</td>
                    <td style={tdStyle}>Rp {hari.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// === Styling ===
const cardStyle = {
  backgroundColor: "#f0f8ff",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid #cce6ff",
};

const labelCard = {
  fontSize: "12px",
  color: "#555",
  marginBottom: "5px",
};

const valueCard = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#222",
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #eee",
};