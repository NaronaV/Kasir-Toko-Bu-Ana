// src/pages/BarangPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TabelBarang from "../components/TabelBarang";

export default function BarangPage() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nama'); // 'nama', 'harga'
  const [sortDirection, setSortDirection] = useState('asc');

  // Form state
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    hargaMin: "",
    hargaMax: "",
    stok: "",
    typeHarga: "fixed",
  });
  const [isEditing, setIsEditing] = useState(null); // _id jika sedang edit

  // Fetch data barang
  useEffect(() => {
    loadBarang();
  }, []);

  const loadBarang = () => {
    setLoading(true);
    api
      .get("/barang")
      .then((res) => {
        setBarang(res.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal load barang:", err);
        setError("Gagal memuat data. Pastikan backend jalan di http://localhost:5000");
      })
      .finally(() => setLoading(false));
  };

  // Filter barang berdasarkan search term
  let filteredBarang = barang.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort barang
  filteredBarang = [...filteredBarang].sort((a, b) => {
    if (sortBy === 'nama') {
      return a.nama.localeCompare(b.nama);
    } else if (sortBy === 'harga') {
      const hargaA = a.typeHarga === 'fixed' ? a.harga : (a.hargaMin + a.hargaMax) / 2;
      const hargaB = b.typeHarga === 'fixed' ? b.harga : (b.hargaMin + b.hargaMax) / 2;
      return sortDirection === 'asc' ? hargaA - hargaB : hargaB - hargaA;
    }
    return 0;
  });

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortDirection('asc');
    }
  };

  // Handle input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setForm({
      nama: "",
      harga: "",
      hargaMin: "",
      hargaMax: "",
      stok: "",
      typeHarga: "fixed",
    });
    setIsEditing(null);
  };

  // Simpan barang (tambah/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nama: form.nama.trim(),
      stok: parseInt(form.stok),
      typeHarga: form.typeHarga,
    };

    if (form.typeHarga === "fixed") {
      payload.harga = parseInt(form.harga);
    } else {
      payload.hargaMin = parseInt(form.hargaMin);
      payload.hargaMax = parseInt(form.hargaMax);
    }

    try {
      if (isEditing) {
        await api.put(`/barang/${isEditing}`, payload);
      } else {
        await api.post("/barang", payload);
      }
      loadBarang();
      resetForm();
    } catch (err) {
      alert("Gagal menyimpan barang: " + (err.response?.data?.message || err.message));
    }
  };

  // Fungsi edit & hapus (dikirim ke TabelBarang)
  const handleEdit = (item) => {
    setForm({
      nama: item.nama,
      stok: item.stok.toString(),
      typeHarga: item.typeHarga,
      harga: item.typeHarga === "fixed" ? (item.harga || "").toString() : "",
      hargaMin: item.typeHarga === "range" ? (item.hargaMin || "").toString() : "",
      hargaMax: item.typeHarga === "range" ? (item.hargaMax || "").toString() : "",
    });
    setIsEditing(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus barang ini?")) return;
    try {
      await api.delete(`/barang/${id}`);
      loadBarang();
    } catch (err) {
      alert("Gagal menghapus barang.");
    }
  };


  if (loading) {
    return (
      <>
        <Navbar title="Stok Barang" showBack />
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: '#6b21a8',
          fontSize: '16px'
        }}>
          ⏳ Memuat data stok...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar title="Stok Barang" showBack />

      <div style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Search Bar */}
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e9d5ff',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '20px' }}>🔍</span>
            <input
              type="text"
              placeholder="Cari Barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#4b0082',
                fontWeight: '500'
              }}
            />
          </div>

          {/* Form Tambah/Edit */}
          <div style={{
            background: 'white',
            padding: '28px',
            borderRadius: '16px',
            marginBottom: '30px',
            border: '2px solid #e9d5ff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{
              marginBottom: '20px',
              color: '#4b0082',
              fontSize: '18px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isEditing ? '✏️ Edit Barang' : '➕ Tambah Barang'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                {/* Nama Barang */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#5b21b6'
                  }}>
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Contoh: Bumbu Rampe"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '2px solid #e9d5ff',
                      fontSize: '14px',
                      color: '#4b0082',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                    onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                  />
                </div>

                {/* Stok */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#5b21b6'
                  }}>
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stok"
                    placeholder="0"
                    value={form.stok}
                    onChange={handleChange}
                    required
                    min="0"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '2px solid #e9d5ff',
                      fontSize: '14px',
                      color: '#4b0082',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                    onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                  />
                </div>

                {/* Tipe Harga */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#5b21b6'
                  }}>
                    Tipe Harga
                  </label>
                  <select
                    name="typeHarga"
                    value={form.typeHarga}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '2px solid #e9d5ff',
                      fontSize: '14px',
                      color: '#4b0082',
                      fontWeight: '500',
                      background: 'white',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                    onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                  >
                    <option value="fixed">Harga Tetap</option>
                    <option value="range">Rentang Harga</option>
                  </select>
                </div>

                {/* Input Harga */}
                {form.typeHarga === 'fixed' ? (
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#5b21b6'
                    }}>
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      name="harga"
                      placeholder="100000"
                      value={form.harga}
                      onChange={handleChange}
                      required
                      min="0"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '2px solid #e9d5ff',
                        fontSize: '14px',
                        color: '#4b0082',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                      onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        color: '#5b21b6'
                      }}>
                        Harga Min (Rp)
                      </label>
                      <input
                        type="number"
                        name="hargaMin"
                        placeholder="Minimum"
                        value={form.hargaMin}
                        onChange={handleChange}
                        required
                        min="0"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '2px solid #e9d5ff',
                          fontSize: '14px',
                          color: '#4b0082',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                        onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        color: '#5b21b6'
                      }}>
                        Harga Max (Rp)
                      </label>
                      <input
                        type="number"
                        name="hargaMax"
                        placeholder="Maximum"
                        value={form.hargaMax}
                        onChange={handleChange}
                        required
                        min="0"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '2px solid #e9d5ff',
                          fontSize: '14px',
                          color: '#4b0082',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                        onBlur={(e) => e.target.style.borderColor = '#e9d5ff'}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Tombol */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: '#c084fc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
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
                  {isEditing ? '✓ Simpan Perubahan' : '+ Tambah Barang'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: '12px 24px',
                      background: '#e9d5ff',
                      color: '#4b0082',
                      border: '2px solid #d8b4fe',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#d8b4fe';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#e9d5ff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
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

          {/* Tabel Barang */}
          {filteredBarang.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '60px 20px',
              borderRadius: '16px',
              textAlign: 'center',
              color: '#6b21a8',
              border: '2px dashed #d8b4fe',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                {searchTerm ? 'Barang tidak ditemukan' : 'Belum ada data barang. Tambahkan barang baru untuk memulai.'}
              </p>
            </div>
          ) : (
            <TabelBarang
              barang={filteredBarang}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          )}
        </div>
      </div>
    </>
  );
}