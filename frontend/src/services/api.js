// src/services/api.js
import axios from "axios";

// Buat instance axios dengan konfigurasi tetap
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Sesuaikan port jika backend beda
  timeout: 10000, // 10 detik timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Opsional: Tambahkan interceptor untuk error global (nanti bisa dikembangkan)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    // Bisa tambahkan notifikasi global error di sini nanti
    return Promise.reject(error);
  }
);

// Export sebagai default — cukup 1 cara impor di seluruh app
export default api;