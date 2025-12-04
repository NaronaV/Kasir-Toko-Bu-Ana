

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Backend berjalan!");
});

// Routes Barang
const barangRoutes = require("./routers/barangRoutes");
app.use("/barang", barangRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server berjalan di port", process.env.PORT);
});
