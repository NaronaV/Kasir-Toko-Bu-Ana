import { useEffect, useState } from "react";
import api from "../services/api";

export default function BarangPage() {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    api.get("/barang")
      .then(res => setBarang(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Barang</h2>

      {barang.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {barang.map(item => (
              <tr key={item._id}>
                <td>{item.nama}</td>
                <td>
                  {item.typeHarga === "fixed"
                    ? "Rp " + item.harga.toLocaleString()
                    : `Rp ${item.hargaMin.toLocaleString()} - Rp ${item.hargaMax.toLocaleString()}`}
                </td>
                <td>{item.stok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
