const Transaksi = require("../models/Transaksi");
const Barang = require("../models/Barang");

// CREATE TRANSAKSI
exports.createTransaksi = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items transaksi tidak boleh kosong" });
    }

    let total = 0;
    let processedItems = [];

    for (const item of items) {
      const barang = await Barang.findById(item.barang);
      if (!barang) {
        return res.status(404).json({ 
          message: `Barang dengan ID ${item.barang} tidak ditemukan` 
        });
      }

      // Validasi stok
      if (barang.stok < item.qty) {
        return res.status(400).json({
          message: `Stok barang "${barang.nama}" tidak cukup. Stok sekarang: ${barang.stok}`
        });
      }

      // Hitung subtotal
      const subtotal = item.qty * item.harga;
      total += subtotal;

      // Kurangi stok
      barang.stok -= item.qty;
      await barang.save();

      processedItems.push({
        barang: item.barang,
        qty: item.qty,
        harga: item.harga,
        subtotal
      });
    }

    // Simpan transaksi
    const transaksiBaru = await Transaksi.create({
      items: processedItems,
      total
    });

    // Populate data barang untuk response
    const transaksiLengkap = await Transaksi.findById(transaksiBaru._id)
      .populate("items.barang");

    res.json({
      message: "Transaksi berhasil!",
      transaksi: transaksiLengkap
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET DETAIL TRANSAKSI BY ID
exports.getDetailTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id)
      .populate("items.barang");

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CETAK NOTA
exports.cetakNota = async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id)
      .populate("items.barang");

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    const tanggal = new Date(transaksi.tanggal);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const tanggalFormat = tanggal.toLocaleDateString('id-ID', options);

    const notaHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nota - ${transaksi._id}</title>
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
    .header h1 { font-size: 20px; margin-bottom: 5px; }
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
    <p>Jl. Contoh No. 123, Kudus</p>
    <p>Telp: 0812-3456-7890</p>
  </div>
  
  <div class="info">
    <div>No. Transaksi: <strong>${transaksi._id}</strong></div>
    <div>Tanggal: ${tanggalFormat}</div>
  </div>
  
  <div class="items">
    ${transaksi.items.map(item => `
      <div class="item">
        <div class="item-row">
          <strong>${item.barang.nama}</strong>
        </div>
        <div class="item-detail">
          <span>${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</span>
          <span>Rp ${item.subtotal.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `).join('')}
  </div>
  
  <div class="total">
    <div class="total-row">
      <span>TOTAL:</span>
      <span>Rp ${transaksi.total.toLocaleString('id-ID')}</span>
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

    res.send(notaHTML);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};