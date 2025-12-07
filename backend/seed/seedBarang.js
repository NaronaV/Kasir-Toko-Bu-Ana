
const mongoose = require("mongoose");
const Barang = require("../models/Barang");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/toko_buana";
console.log("MONGO_URI =", uri); // debug

const dataBarang = [
  { nama: "Bumbu Rampe", typeHarga: "fixed", harga: 100000, stok: 999 },
  { nama: "Patok Pembatas", typeHarga: "fixed", harga: 12500, stok: 999 },
  { nama: "Batu Nisan Semen", typeHarga: "fixed", harga: 185000, stok: 999 },
  { nama: "Batu Nisan Keramik", typeHarga: "fixed", harga: 285000, stok: 999 },
  { nama: "Batu Nisan Kijing", typeHarga: "fixed", harga: 1150000, stok: 999 },
  { nama: "Kain Kafan 12 Meter", typeHarga: "fixed", harga: 480000, stok: 999 },
  { nama: "Kain Kafan 13 Meter", typeHarga: "fixed", harga: 500000, stok: 999 },
  { nama: "Kain Kafan 14 Meter", typeHarga: "fixed", harga: 520000, stok: 999 },
  { nama: "Tikar Pandan (Bayi)", typeHarga: "fixed", harga: 30000, stok: 999 },
  { nama: "Tikar Pandan (Dewasa)", typeHarga: "fixed", harga: 35000, stok: 999 },
  { nama: "Papan Kayu Sambung 3", typeHarga: "fixed", harga: 780000, stok: 999 },
  { nama: "Papan Kayu Sambung 2", typeHarga: "fixed", harga: 800000, stok: 999 },
  {
    nama: "Papan Kayu Tanpa Sambung",
    typeHarga: "range",
    hargaMin: 1500000,
    hargaMax: 2750000,
    stok: 999
  }
];

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected (seed)");

    await Barang.deleteMany({});
    console.log("Data lama dihapus.");

    await Barang.insertMany(dataBarang);
    console.log("Data barang berhasil dimasukkan!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();