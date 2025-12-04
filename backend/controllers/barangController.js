const Barang = require("../models/Barang");

// ➤ GET semua barang
exports.getBarang = async (req, res) => {
  try {
    const data = await Barang.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ POST tambah barang
exports.tambahBarang = async (req, res) => {
  const { nama, harga, stok } = req.body;

  try {
    const barangBaru = new Barang({ nama, harga, stok });
    await barangBaru.save();
    res.json({ message: "Barang berhasil ditambahkan", data: barangBaru });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ PUT update barang
exports.updateBarang = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, stok } = req.body;

  try {
    const updateData = await Barang.findByIdAndUpdate(
      id,
      { nama, harga, stok },
      { new: true }
    );
    res.json({ message: "Barang berhasil diupdate", data: updateData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ DELETE barang
exports.hapusBarang = async (req, res) => {
  const { id } = req.params;

  try {
    await Barang.findByIdAndDelete(id);
    res.json({ message: "Barang berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
