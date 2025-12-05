const Transaksi = require("../models/Transaksi");

exports.getRiwayat = async (req, res) => {
  try {
    const data = await Transaksi.find()
      .populate("items.barang") // tampilkan info barang
      .sort({ tanggal: -1 });   // terbaru dulu

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

