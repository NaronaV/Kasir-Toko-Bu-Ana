import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarangPage from "./pages/BarangPage";
import TransaksiPage from "./pages/TransaksiPage";
import RiwayatPage from "./pages/RiwayatPage";
import RekapPage from "./pages/RekapPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BarangPage />} />
        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/rekap" element={<RekapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
