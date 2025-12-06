import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export async function getBarang() {
  const res = await fetch(`${API_BASE}/barang`);
  return res.json();
}

export async function createTransaksi(data) {
  const res = await fetch(`${API_BASE}/transaksi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getRiwayat() {
  const res = await fetch(`${API_BASE}/riwayat`);
  return res.json();
}

export async function getRekap(bulan, tahun) {
  const res = await fetch(`${API_BASE}/rekap?bulan=${bulan}&tahun=${tahun}`);
  return res.json();
}


const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export default api;
