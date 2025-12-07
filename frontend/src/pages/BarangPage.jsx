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
      <Navbar title="STOK BARANG" showBack />

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Form Tambah/Edit */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #eee",
          }}
        >
          <h3 style={{ margin: "0 0 15px" }}>
            {isEditing ? "Edit Barang" : "Tambah Barang Baru"}
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Nama Barang */}
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                name="nama"
                placeholder="Nama barang"
                value={form.nama}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "6px" }}
              />
            </div>

            {/* Tipe Harga */}
            <div style={{ marginBottom: "10px", display: "flex", gap: "15px" }}>
              <label>
                <input
                  type="radio"
                  name="typeHarga"
                  value="fixed"
                  checked={form.typeHarga === "fixed"}
                  onChange={handleChange}
                />{" "}
                Harga Tetap
              </label>
              <label>
                <input
                  type="radio"
                  name="typeHarga"
                  value="range"
                  checked={form.typeHarga === "range"}
                  onChange={handleChange}
                />{" "}
                Rentang Harga
              </label>
            </div>

            {/* Input Harga */}
            {form.typeHarga === "fixed" ? (
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  name="harga"
                  placeholder="Harga (Rp)"
                  value={form.harga}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{ width: "100%", padding: "6px" }}
                />
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "8px" }}>
                  <input
                    type="number"
                    name="hargaMin"
                    placeholder="Harga Min (Rp)"
                    value={form.hargaMin}
                    onChange={handleChange}
                    required
                    min="0"
                    style={{ width: "100%", padding: "6px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="number"
                    name="hargaMax"
                    placeholder="Harga Max (Rp)"
                    value={form.hargaMax}
                    onChange={handleChange}
                    required
                    min="0"
                    style={{ width: "100%", padding: "6px" }}
                  />
                </div>
              </>
            )}

            {/* Stok */}
            <div style={{ marginBottom: "15px" }}>
              <input
                type="number"
                name="stok"
                placeholder="Stok"
                value={form.stok}
                onChange={handleChange}
                required
                min="0"
                style={{ width: "100%", padding: "6px" }}
              />
            </div>

            {/* Tombol */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {isEditing ? "Simpan" : "Tambah"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Barang */}
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
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