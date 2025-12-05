const Transaksi = require("../models/Transaksi");

exports.getRekapBulanan = async (req, res) => {
  try {
    const tahun = parseInt(req.params.tahun);

    const data = await Transaksi.aggregate([
      {
        $match: {
          tanggal: {
            $gte: new Date(tahun, 0, 1),
            $lte: new Date(tahun, 11, 31)
          }
        }
      },
      {
        $group: {
          _id: {
            bulan: { $month: "$tanggal" }
          },
          totalPendapatan: { $sum: "$total" },
          totalTransaksi: { $sum: 1 },
          totalQtyTerjual: {
            $sum: {
              $sum: "$items.qty" // total item terjual dalam array
            }
          }
        }
      },
      { $sort: { "_id.bulan": 1 } }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

