// src/pages/RekapPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function RekapPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const [tahun, setTahun] = useState(currentYear.toString());
  const [bulan, setBulan] = useState(currentMonth);
  const [rekap, setRekap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Daftar bulan & tahun
  const bulanList = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const tahunList = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  // Fetch data rekap
  useEffect(() => {
    const fetchRekap = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/rekap/${tahun}?bulan=${bulan}`);
        setRekap(res.data);
      } catch (err) {
        console.error("Gagal load rekap:", err);
        setError("Gagal memuat laporan. Pastikan backend jalan.");
        setRekap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRekap();
  }, [bulan, tahun]);

  if (loading) {
    return (
      <>
        <Navbar title="Rekap Bulanan" showBack />
        <div style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#6b21a8",
          fontSize: "16px"
        }}>
          ⏳ Memuat laporan...
        </div>
      </>
    );
  }

  // Hitung rata-rata jika belum dikirim backend
  const rataRata = rekap?.totalTransaksi > 0
    ? Math.round(rekap.totalPendapatan / rekap.totalTransaksi)
    : 0;

  const bulanNama = bulanList.find(b => b.value === bulan)?.label || '';

  return (
    <>
      <Navbar title="Rekap Bulanan" showBack />

      <div style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
        padding: '40px 20px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Filter Section */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            marginBottom: '30px',
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
              🔍 Filter Laporan
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#5b21b6',
                  marginBottom: '8px'
                }}>
                  Bulan
                </label>
                <select
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '2px solid #e9d5ff',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b21a8',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                  onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                >
                  {bulanList.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#5b21b6',
                  marginBottom: '8px'
                }}>
                  Tahun
                </label>
                <select
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '2px solid #e9d5ff',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b21a8',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                  onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                >
                  {tahunList.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div style={{
              background: '#fecaca',
              border: '2px solid #fca5a5',
              borderRadius: '12px',
              padding: '16px',
              color: '#b91c1c',
              marginBottom: '30px',
              fontWeight: '500'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Summary Cards */}
          {rekap ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '30px'
              }}>
                {/* Card 1: Total Transaksi */}
                <div style={{
                  background: '#e9d5ff',
                  border: '3px solid #c084fc',
                  borderRadius: '16px',
                  padding: '28px',
                  textAlign: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px'
                  }}>
                    📊
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5b21b6',
                    fontWeight: '600',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Total Transaksi
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    color: '#4b0082'
                  }}>
                    {rekap.totalTransaksi || 0}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b21a8',
                    marginTop: '8px',
                    opacity: '0.8'
                  }}>
                    transaksi
                  </div>
                </div>

                {/* Card 2: Total Pendapatan */}
                <div style={{
                  background: '#e9d5ff',
                  border: '3px solid #c084fc',
                  borderRadius: '16px',
                  padding: '28px',
                  textAlign: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px'
                  }}>
                    💰
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5b21b6',
                    fontWeight: '600',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Total Pendapatan
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#4b0082',
                    wordBreak: 'break-word'
                  }}>
                    Rp {(rekap.totalPendapatan || 0).toLocaleString('id-ID')}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b21a8',
                    marginTop: '8px',
                    opacity: '0.8'
                  }}>
                    {bulanNama} {tahun}
                  </div>
                </div>

                {/* Card 3: Rata-rata Penghasilan */}
                <div style={{
                  background: '#e9d5ff',
                  border: '3px solid #c084fc',
                  borderRadius: '16px',
                  padding: '28px',
                  textAlign: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px'
                  }}>
                    📈
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5b21b6',
                    fontWeight: '600',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Rata-rata/Transaksi
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#4b0082',
                    wordBreak: 'break-word'
                  }}>
                    Rp {rataRata.toLocaleString('id-ID')}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b21a8',
                    marginTop: '8px',
                    opacity: '0.8'
                  }}>
                    pendapatan per transaksi
                  </div>
                </div>
              </div>

              {/* Detail Tabel Harian */}
              {rekap?.transaksiPerHari?.length > 0 && (
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e9d5ff',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: '#e9d5ff',
                    padding: '20px 24px',
                    borderBottom: '1px solid #d8b4fe',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '18px' }}>📋</span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#4b0082',
                      margin: '0'
                    }}>
                      Detail Harian
                    </h3>
                  </div>

                  <div style={{
                    overflowX: 'auto'
                  }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '14px'
                    }}>
                      <thead>
                        <tr style={{
                          background: '#faf5ff',
                          borderBottom: '2px solid #e9d5ff'
                        }}>
                          <th style={{
                            padding: '16px',
                            textAlign: 'left',
                            fontWeight: '700',
                            color: '#5b21b6'
                          }}>
                            Tanggal
                          </th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#5b21b6'
                          }}>
                            Jumlah Transaksi
                          </th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'right',
                            fontWeight: '700',
                            color: '#5b21b6'
                          }}>
                            Total Pendapatan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rekap.transaksiPerHari.map((hari, idx) => (
                          <tr
                            key={idx}
                            style={{
                              background: idx % 2 === 0 ? 'white' : '#faf5ff',
                              borderBottom: '1px solid #f3e8ff',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f3e8ff'}
                            onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#faf5ff'}
                          >
                            <td style={{
                              padding: '14px 16px',
                              color: '#4b0082',
                              fontWeight: '500'
                            }}>
                              {new Date(hari.tanggal).toLocaleDateString('id-ID', {
                                weekday: 'short',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </td>
                            <td style={{
                              padding: '14px 16px',
                              textAlign: 'center',
                              color: '#6b21a8',
                              fontWeight: '600'
                            }}>
                              {hari.jumlah} transaksi
                            </td>
                            <td style={{
                              padding: '14px 16px',
                              textAlign: 'right',
                              color: '#4b0082',
                              fontWeight: '600'
                            }}>
                              Rp {hari.total.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              color: '#6b21a8',
              border: '2px dashed #d8b4fe',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              📭 Tidak ada data untuk periode {bulanNama} {tahun}
            </div>
          )}
        </div>
      </div>
    </>
  );
}