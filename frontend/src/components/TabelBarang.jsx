export default function TabelBarang({ data }) {
  return (
    <table border="1" width="100%" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Harga</th>
          <th>Stok</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.nama}</td>
            <td>
              {item.typeHarga === "fixed"
                ? `Rp ${item.harga.toLocaleString()}`
                : `Rp ${item.hargaMin.toLocaleString()} - Rp ${item.hargaMax.toLocaleString()}`
              }
            </td>
            <td>{item.stok}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
