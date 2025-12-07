export default function TabelBarang({ barang, onEdit, onDelete, sortBy, sortDirection, onSort }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e9d5ff',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        background: '#e9d5ff',
        padding: '16px 24px',
        borderBottom: '2px solid #d8b4fe',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#4b0082',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📋 Daftar Barang ({barang.length})
        </h3>
        {onSort && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onSort('nama')}
              style={{
                padding: '6px 12px',
                background: sortBy === 'nama' ? '#c084fc' : '#e9d5ff',
                color: sortBy === 'nama' ? 'white' : '#5b21b6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#a855f7';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = sortBy === 'nama' ? '#c084fc' : '#e9d5ff';
                e.currentTarget.style.color = sortBy === 'nama' ? 'white' : '#5b21b6';
              }}
            >
              📝 Abjad
            </button>
            <button
              onClick={() => onSort('harga')}
              style={{
                padding: '6px 12px',
                background: sortBy === 'harga' ? '#c084fc' : '#e9d5ff',
                color: sortBy === 'harga' ? 'white' : '#5b21b6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#a855f7';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = sortBy === 'harga' ? '#c084fc' : '#e9d5ff';
                e.currentTarget.style.color = sortBy === 'harga' ? 'white' : '#5b21b6';
              }}
            >
              💰 Harga {sortBy === 'harga' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ background: '#faf5ff', borderBottom: '2px solid #e9d5ff' }}>
              <th style={{
                padding: '14px 24px',
                textAlign: 'left',
                fontWeight: '700',
                color: '#5b21b6',
                minWidth: '200px'
              }}>
                Nama Barang
              </th>
              <th style={{
                padding: '14px 24px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#5b21b6',
                minWidth: '100px'
              }}>
                Stok
              </th>
              <th style={{
                padding: '14px 24px',
                textAlign: 'right',
                fontWeight: '700',
                color: '#5b21b6',
                minWidth: '200px'
              }}>
                Harga
              </th>
              <th style={{
                padding: '14px 24px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#5b21b6',
                minWidth: '140px'
              }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, idx) => (
              <tr
                key={item._id}
                style={{
                  background: idx % 2 === 0 ? 'white' : '#faf5ff',
                  borderBottom: '1px solid #f3e8ff',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f3e8ff'}
                onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#faf5ff'}
              >
                <td style={{
                  padding: '14px 24px',
                  color: '#4b0082',
                  fontWeight: '500'
                }}>
                  {item.nama}
                </td>
                <td style={{
                  padding: '14px 24px',
                  textAlign: 'center',
                  color: '#6b21a8',
                  fontWeight: '600'
                }}>
                  <span style={{
                    background: '#e9d5ff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    minWidth: '50px'
                  }}>
                    {item.stok}
                  </span>
                </td>
                <td style={{
                  padding: '14px 24px',
                  textAlign: 'right',
                  color: '#4b0082',
                  fontWeight: '600'
                }}>
                  {item.typeHarga === 'fixed'
                    ? `Rp ${item.harga.toLocaleString('id-ID')}`
                    : `Rp ${item.hargaMin.toLocaleString('id-ID')} - Rp ${item.hargaMax.toLocaleString('id-ID')}`
                  }
                </td>
                <td style={{
                  padding: '14px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => onEdit(item)}
                    style={{
                      padding: '8px 12px',
                      background: '#c084fc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#a855f7';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#c084fc';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    style={{
                      padding: '8px 12px',
                      background: '#fca5a5',
                      color: '#7f1d1d',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f87171';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fca5a5';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
