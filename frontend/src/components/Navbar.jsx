// src/components/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ title, showBack = false, showSearch = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Warna header berdasarkan halaman
  const getBackgroundColor = () => {
    if (location.pathname === '/') return '#C7B6F0'; // Home → ungu
    if (location.pathname.startsWith('/riwayat')) return '#6c9ed7'; // Riwayat → biru
    if (location.pathname.startsWith('/transaksi')) return '#6c9ed7'; // Kasir → biru
    if (location.pathname.startsWith('/barang')) return '#6c9ed7';
    if (location.pathname.startsWith('/rekap')) return '#6c9ed7';
    return '#6c9ed7';
  };

  const isHome = location.pathname === '/';

  return (
    <header
      style={{
        backgroundColor: getBackgroundColor(),
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Tombol Kembali (opsional) */}
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ←
        </button>
      ) : isHome ? (
        <h2 style={{ margin: 0, color: '#333' }}>Toko Ana</h2>
      ) : (
        <div style={{ width: '30px' }} /> // Spacer agar layout tetap seimbang
      )}

      {/* Judul */}
      <h2
        style={{
          margin: 0,
          color: isHome ? '#333' : 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          flex: 1,
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {title}
      </h2>

      {/* Profil / Ikon Pencarian */}
      {isHome ? (
        // Di home: tampilkan profil
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            👤
          </div>
          <span style={{ color: '#333' }}>Admin</span>
        </div>
      ) : showSearch ? (
        // Di halaman lain: tampilkan ikon pencarian
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          🔍
        </div>
      ) : (
        <div style={{ width: '30px' }} />
      )}
    </header>
  );
}