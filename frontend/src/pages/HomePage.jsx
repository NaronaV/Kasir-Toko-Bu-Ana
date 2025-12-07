import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: 'Kasir',
      icon: '💳',
      path: '/transaksi',
      color: '#2563eb',
      description: 'Proses penjualan'
    },
    {
      id: 2,
      title: 'Data Barang',
      icon: '📦',
      path: '/barang',
      color: '#059669',
      description: 'Kelola stok'
    },
    {
      id: 3,
      title: 'Riwayat',
      icon: '📋',
      path: '/riwayat',
      color: '#d97706',
      description: 'Transaksi'
    },
    {
      id: 4,
      title: 'Laporan',
      icon: '📊',
      path: '/rekap',
      color: '#7c3aed',
      description: 'Analisis'
    }
  ];

  return (
    <>
      <Navbar title="Dashboard" />
      
      <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
              Toko Bu Ana
            </h1>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '0' }}>
              Sistem Kasir & Manajemen Inventory
            </p>
          </div>

          {/* Menu Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  background: 'white',
                  border: `2px solid ${item.color}`,
                  borderRadius: '12px',
                  padding: '24px 20px',
                  cursor: 'pointer',
                  color: '#1e293b',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 16px rgba(0, 0, 0, 0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1e293b';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', opacity: '0.7', margin: '0' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📌</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: '#1e293b' }}>
                Mulai Cepat
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
                Klik menu untuk memulai
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💾</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: '#1e293b' }}>
                Data Aman
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
                Tersimpan di MongoDB
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: '#1e293b' }}>
                Cepat & Responsif
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
                Teknologi modern
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}