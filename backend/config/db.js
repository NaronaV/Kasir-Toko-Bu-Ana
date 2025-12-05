const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tokobuana');
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
};
