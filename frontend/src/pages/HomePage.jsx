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
      color: '#e9d5ff',
      borderColor: '#c084fc',
      description: 'Proses penjualan'
    },
    {
      id: 2,
      title: 'Stok Barang',
      icon: '📦',
      path: '/barang',
      color: '#fce7f3',
      borderColor: '#f472b6',
      description: 'Kelola inventory'
    },
    {
      id: 3,
      title: 'Rekap Bulanan',
      icon: '📊',
      path: '/rekap',
      color: '#dbeafe',
      borderColor: '#0ea5e9',
      description: 'Laporan penjualan'
    },
    {
      id: 4,
      title: 'Riwayat Penjualan',
      icon: '📋',
      path: '/riwayat',
      color: '#fef3c7',
      borderColor: '#fcd34d',
      description: 'Lihat transaksi'
    }
  ];

  return (
    <>
      <Navbar title="HOME" />
      
      <div style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#6b21a8',
              marginBottom: '10px',
              letterSpacing: '-0.5px'
            }}>
              🏪 Toko Bu Ana
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#a855f7',
              fontWeight: '500',
              marginBottom: '0'
            }}>
              Sistem Kasir & Manajemen Inventory
            </p>
          </div>

          {/* Menu Grid 2x2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  background: item.color,
                  border: `3px solid ${item.borderColor}`,
                  borderRadius: '20px',
                  padding: '40px 30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  textAlign: 'center',
                  transform: 'translateY(0)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = item.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Icon */}
                <div style={{
                  fontSize: '64px',
                  lineHeight: '1',
                  display: 'block'
                }}>
                  {item.icon}
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#4b0082',
                  margin: '0',
                  letterSpacing: '-0.5px'
                }}>
                  {item.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b21a8',
                  margin: '0',
                  fontWeight: '500',
                  opacity: '0.8'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e9d5ff'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#6b21a8',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ℹ️ Tentang Aplikasi
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#5b21b6',
              lineHeight: '1.8',
              margin: '0'
            }}>
              Selamat datang di Toko Bu Ana - punya mamahnya Mas Revan 
            </p>
          </div>
        </div>
      </div>
    </>
  );
}