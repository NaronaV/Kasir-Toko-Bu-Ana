// src/pages/RiwayatPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data riwayat saat halaman dibuka
  useEffect(() => {
    api
      .get("/riwayat")
      .then((response) => {
        setRiwayat(response.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal load riwayat:", err);
        setError("Gagal memuat riwayat transaksi. Pastikan backend jalan.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading riwayat transaksi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Biru */}
      <header style={{
        backgroundColor: '#6c9ed7',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          ←
        </button>

        <h2 style={{ margin: 0, color: 'white', textAlign: 'center', flex: 1 }}>RIWAYAT PENJUALAN</h2>

        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          🔍
        </div>
      </header>

      {/* Tabel Riwayat */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 120px)'
      }}>
        {riwayat.length === 0 ? (
          <p>Tidak ada transaksi.</p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#6c9ed7', color: 'white' }}>
                <th style={headerStyle}>No</th>
                <th style={headerStyle}>Tanggal</th>
                <th style={headerStyle}>Pembeli</th>
                <th style={headerStyle}>Nama Barang</th>
                <th style={headerStyle}>Item</th>
                <th style={headerStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((transaksi, index) => (
                <tr key={transaksi._id || index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>
                    {new Date(transaksi.tanggal).toLocaleString("id-ID")}
                  </td>
                  <td style={cellStyle}>-</td> {/* Jika tidak ada nama pembeli */}
                  <td style={cellStyle}>
                    {transaksi.items?.map((item, idx) => (
                      <div key={idx}>
                        {item.nama || "Barang"}<br />
                      </div>
                    ))}
                  </td>
                  <td style={cellStyle}>
                    {transaksi.items?.map((item, idx) => (
                      <div key={idx}>
                        {item.jumlah}<br />
                      </div>
                    ))}
                  </td>
                  <td style={cellStyle}>
                    Rp {transaksi.total?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Styling reusable
const headerStyle = {
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const cellStyle = {
  padding: '10px',
  textAlign: 'left',
  verticalAlign: 'top',
  backgroundColor: '#f5f5f5',
};