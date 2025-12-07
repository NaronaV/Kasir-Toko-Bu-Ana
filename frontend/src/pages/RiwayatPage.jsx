// src/pages/RiwayatPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

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

  return (
    <>
      <Navbar title="Riwayat Penjualan" showBack showSearch />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', background: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
        {loading ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #e2e8f0'
          }}>
            <p>⏳ Memuat riwayat transaksi...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : riwayat.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
            <p>Belum ada transaksi. Mulai dengan menu Kasir untuk buat transaksi baru.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Barang</th>
                <th>Jumlah</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((transaksi, index) => (
                <tr key={transaksi._id || index}>
                  <td style={{ fontWeight: '600', color: '#2563eb' }}>{index + 1}</td>
                  <td>
                    {new Date(transaksi.tanggal).toLocaleString("id-ID")}
                  </td>
                  <td>
                    {transaksi.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '13px', marginBottom: '2px' }}>
                        {item.barang?.nama || "Barang"}
                      </div>
                    ))}
                  </td>
                  <td>
                    {transaksi.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '13px', marginBottom: '2px' }}>
                        {item.qty}x
                      </div>
                    ))}
                  </td>
                  <td style={{ fontWeight: '600', color: '#059669' }}>
                    Rp {transaksi.total?.toLocaleString('id-ID') || 0}
                  </td>
                  <td>
                    <button
                      onClick={() => window.open(`/cetak-nota/${transaksi._id}`, '_blank')}
                      style={{
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#1e40af';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#2563eb';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      🖨️ Cetak
                    </button>
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