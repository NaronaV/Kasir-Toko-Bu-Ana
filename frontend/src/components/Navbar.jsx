// src/components/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ title, showBack = false, showSearch = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header
      style={{
        background: '#2563eb',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Tombol Kembali */}
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
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
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>
      ) : isHome ? (
        <h2 style={{ margin: 0, color: 'white', fontSize: '22px', fontWeight: '700' }}>
          🏪 Toko Ana
        </h2>
      ) : (
        <div style={{ width: '36px' }} />
      )}

      {/* Judul */}
      <h2
        style={{
          margin: 0,
          color: 'white',
          fontWeight: '600',
          textAlign: 'center',
          flex: 1,
          marginLeft: '16px',
          marginRight: '16px',
          fontSize: '16px',
        }}
      >
        {title}
      </h2>

      {/* Right Side Icons */}
      {isHome ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: 'white',
            }}
          >
            👤
          </div>
          <span style={{ color: 'white', fontWeight: '500', fontSize: '13px' }}>Admin</span>
        </div>
      ) : showSearch ? (
        <button
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            fontSize: '16px',
            color: 'white',
            transition: 'all 0.2s ease',
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
          🔍
        </button>
      ) : (
        <div style={{ width: '36px' }} />
      )}
    </header>
  );
}