// src/pages/RiwayatPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/riwayat")
      .then((response) => {
        setRiwayat(response.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal load riwayat:", err);
        setError("Gagal memuat data. Pastikan backend jalan di http://localhost:5000");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar title="RIWAYAT PENJUALAN" showBack showSearch />
        <div style={{ padding: "20px" }}>Loading riwayat transaksi...</div>
      </>
    );
  }

  return (
    <>
      <Navbar title="RIWAYAT PENJUALAN" showBack showSearch />

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : riwayat.length === 0 ? (
          <p>Tidak ada transaksi.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#6c9ed7", color: "white" }}>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Tanggal</th>
                <th style={thStyle}>Pembeli</th>
                <th style={thStyle}>Nama Barang</th>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((transaksi, index) => (
                <tr key={transaksi._id || index} style={{ backgroundColor: "#f9f9f9" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>
                    {new Date(transaksi.tanggal).toLocaleString("id-ID")}
                  </td>
                  <td style={tdStyle}>-</td> {/* Bisa diisi nanti jika backend kirim nama pembeli */}
                  <td style={tdStyle}>
                    {transaksi.items?.map((item, i) => (
                      <div key={i}>{item.nama || "Barang"}</div>
                    ))}
                  </td>
                  <td style={tdStyle}>
                    {transaksi.items?.map((item, i) => (
                      <div key={i}>{item.jumlah}</div>
                    ))}
                  </td>
                  <td style={tdStyle}>
                    Rp {transaksi.total?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// === Styling Reusable ===
const thStyle = {
  padding: "12px 10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px 10px",
  textAlign: "left",
  verticalAlign: "top",
  borderBottom: "1px solid #eee",
};