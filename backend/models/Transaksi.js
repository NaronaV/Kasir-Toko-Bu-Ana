const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
  items: [
    {
      barangId: String,
      nama: String,
      qty: Number,
      harga: Number
    }
  ],
  total: Number,
  tanggal: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaksi", transaksiSchema);

