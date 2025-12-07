// src/pages/BarangPage.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TabelBarang from "../components/TabelBarang";

export default function BarangPage() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Navbar title="STOK BARANG" showBack />
        <div style={{ padding: "20px" }}>Loading data stok...</div>
      </>
    );
  }

  return (
    <>
      <Navbar title="Data Barang" showBack />

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', background: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
        {/* Form Tambah/Edit */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>
            {isEditing ? '✏️ Edit Barang' : '➕ Tambah Barang'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Nama Barang */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
                  Nama Barang
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Contoh: Bumbu Rampe"
                  value={form.nama}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              {/* Stok */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
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
                />
              </div>

              {/* Tipe Harga */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
                  Tipe Harga
                </label>
                <select
                  name="typeHarga"
                  value={form.typeHarga}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="fixed">Harga Tetap</option>
                  <option value="range">Rentang Harga</option>
                </select>
              </div>

              {/* Input Harga */}
              {form.typeHarga === 'fixed' ? (
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
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
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
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
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
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
                    />
                  </div>
                </>
              )}
            </div>

            {/* Tombol */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                type="submit"
                className="btn-success"
                style={{ padding: '10px 20px' }}
              >
                {isEditing ? '✓ Simpan' : '+ Tambah'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                  style={{ padding: '10px 20px' }}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Barang */}
        {error ? (
          <div className="error-message">{error}</div>
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Memuat data barang...
          </div>
        ) : barang.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
            <p>Belum ada data barang. Tambahkan barang baru untuk memulai.</p>
          </div>
        ) : (
          <TabelBarang
            barang={barang}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}