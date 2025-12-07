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
      {/* Header biru gelap dengan ikon nota (judul putih) */}
      <div style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
        padding: '0',
        borderBottom: '2px solid #1e40af',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px 18px 32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              color: 'white',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ←
          </button>
          <h1 style={{
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '24px',
            letterSpacing: '-0.5px',
            margin: 0
          }}>RIWAYAT PENJUALAN</h1>
          <span style={{ fontSize: '28px', color: '#ffffff', background: 'transparent', borderRadius: '50%', padding: '8px' }}>🧾</span>
        </div>
      </div>

      <div style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#f8fafc',
        minHeight: 'calc(100vh - 70px)'
      }}>
        {loading ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            color: '#2563eb',
            border: '2px solid #e0e7ff',
            fontWeight: '500',
            fontSize: '16px'
          }}>
            ⏳ Memuat riwayat transaksi...
          </div>
        ) : error ? (
          <div style={{
            background: '#fee2e2',
            border: '2px solid #fca5a5',
            borderRadius: '12px',
            padding: '16px',
            color: '#b91c1c',
            marginBottom: '30px',
            fontWeight: '500'
          }}>{error}</div>
        ) : riwayat.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '60px 20px',
            borderRadius: '16px',
            textAlign: 'center',
            color: '#2563eb',
            border: '2px dashed #e0e7ff',
            boxShadow: '0 4px 12px rgba(37,99,235,0.08)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧾</div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
              Belum ada transaksi. Mulai dengan menu Kasir untuk buat transaksi baru.
            </p>
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(37,99,235,0.08)',
            border: '1px solid #e0e7ff',
            overflow: 'auto',
            maxHeight: '70vh'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              color: '#ffffff'
            }}>
              <thead>
                <tr style={{ background: '#1e40af', borderBottom: '2px solid #1e3a8a' }}>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>No</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Tanggal</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Nama Barang</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Item</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Total</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((transaksi, index) => (
                  <tr key={transaksi._id || index}
                    style={{
                      background: index % 2 === 0 ? '#f3f4f6' : 'white',
                      borderBottom: '1px solid #e0e7ff',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#bae6fd'}
                    onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#f3f4f6' : 'white'}
                  >
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#4b0082' }}>{index + 1}</td>
                    <td style={{ textAlign: 'center', color: '#4b0082' }}>{new Date(transaksi.tanggal).toLocaleString('id-ID')}</td>
                    <td style={{ textAlign: 'center' }}>
                      {transaksi.items?.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '13px', marginBottom: '2px', color: '#4b0082', fontWeight: '600' }}>
                          {item.barang?.nama || 'Barang'}
                        </div>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {transaksi.items?.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '13px', marginBottom: '2px', color: '#6b21a8', fontWeight: '500' }}>
                          {item.qty}x
                        </div>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#4b0082' }}>
                      Rp {transaksi.total?.toLocaleString('id-ID') || 0}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => window.open(`${api.defaults.baseURL.replace('/api','')}/api/transaksi/${transaksi._id}/cetak`, '_blank')}
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
                        onMouseEnter={e => {
                          e.target.style.background = '#1e40af';
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
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
          </div>
        )}
      </div>
    </>
  );
}