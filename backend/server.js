const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// KONEKSI DATABASE (cukup sekali)
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// CEK SERVER
app.get("/", (req, res) => {
  res.send("Backend berjalan!");
});

// IMPORT ROUTES
const barangRoutes = require("./routes/barangRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
const riwayatRoutes = require("./routes/riwayatRoutes");
const rekapRoutes = require("./routes/rekapRoutes");

// REGISTER ROUTES (cukup satu prefix)
app.use("/api/barang", barangRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/rekap", rekapRoutes);

// ERROR HANDLER
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// JALANKAN SERVER (cukup sekali)
app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log("Server berjalan di port", process.env.PORT || 5000);
  console.log("API ready at http://localhost:5000/api");
});
