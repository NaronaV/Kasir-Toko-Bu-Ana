const express = require("express");
const router = express.Router();
const { getRekapBulanan } = require("../controllers/rekapController");

router.get("/:tahun", getRekapBulanan);

module.exports = router;