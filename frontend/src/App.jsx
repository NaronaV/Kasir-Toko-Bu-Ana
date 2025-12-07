// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BarangPage from "./pages/BarangPage";
import TransaksiPage from "./pages/TransaksiPage";
import RiwayatPage from "./pages/RiwayatPage";
import RekapPage from "./pages/RekapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/barang" element={<BarangPage />} />
        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/rekap" element={<RekapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;