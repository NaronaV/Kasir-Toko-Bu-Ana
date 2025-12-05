const express = require("express");
const router = express.Router();

const {
  getBarang,
  tambahBarang,
  updateBarang,
  hapusBarang
} = require("../controllers/barangController");

router.get("/", getBarang);
router.post("/", tambahBarang);
router.put("/:id", updateBarang);
router.delete("/:id", hapusBarang);

module.exports = router;