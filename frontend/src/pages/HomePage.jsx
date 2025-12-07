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
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Proses penjualan barang'
    },
    {
      id: 2,
      title: 'Data Barang',
      icon: '📦',
      path: '/barang',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Kelola stok barang'
    },
    {
      id: 3,
      title: 'Riwayat',
      icon: '📋',
      path: '/riwayat',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Lihat riwayat transaksi'
    },
    {
      id: 4,
      title: 'Rekap',
      icon: '📊',
      path: '/rekap',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Laporan penjualan'
    }
  ];

  return (
    <>
      <Navbar title="Dashboard Toko Ana" />
      
      <div style={{ padding: '40px 20px', background: '#f5f7fa', minHeight: 'calc(100vh - 70px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '10px', fontWeight: '700' }}>
              Selamat Datang di Toko Bu Ana
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Sistem Kasir dan Manajemen Inventory Terpadu
            </p>
          </div>

          {/* Menu Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  background: item.color,
                  borderRadius: '16px',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', opacity: '0.9', textAlign: 'center' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
              📌 Panduan Penggunaan
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '14px' }}>
              <li><strong>Kasir:</strong> Gunakan untuk mencatat penjualan dan mencetak nota</li>
              <li><strong>Data Barang:</strong> Tambah, edit, atau hapus data produk yang dijual</li>
              <li><strong>Riwayat:</strong> Lihat semua transaksi yang telah dilakukan</li>
              <li><strong>Rekap:</strong> Analisis penjualan dan laporan keuangan harian/bulanan</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}