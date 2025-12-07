// src/components/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ title, showBack = false, showSearch = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#667eea',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ←
        </button>
      ) : isHome ? (
        <h2 style={{ margin: 0, color: 'white', fontSize: '24px', fontWeight: '700' }}>
          🏪 Toko Ana
        </h2>
      ) : (
        <div style={{ width: '40px' }} />
      )}

      {/* Judul */}
      <h2
        style={{
          margin: 0,
          color: 'white',
          fontWeight: '700',
          textAlign: 'center',
          flex: 1,
          marginLeft: '16px',
          marginRight: '16px',
          fontSize: '18px',
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </h2>

      {/* Right Side Icons */}
      {isHome ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              backdropFilter: 'blur(10px)',
            }}
          >
            👤
          </div>
          <span style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Admin</span>
        </div>
      ) : showSearch ? (
        <button
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            fontSize: '18px',
            color: 'white',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🔍
        </button>
      ) : (
        <div style={{ width: '40px' }} />
      )}
    </header>
  );
}