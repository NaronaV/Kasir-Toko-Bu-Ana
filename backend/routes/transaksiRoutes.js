const express = require("express");
const router = express.Router();
const { 
  createTransaksi, 
  getDetailTransaksi,
  cetakNota 
} = require("../controllers/transaksiController");

// POST: Buat transaksi baru
router.post("/", createTransaksi);

// GET: Detail transaksi by ID (untuk cetak ulang)
router.get("/:id", getDetailTransaksi);

// GET: Cetak nota (HTML untuk print / thermal)
router.get("/:id/cetak", cetakNota);

module.exports = router;