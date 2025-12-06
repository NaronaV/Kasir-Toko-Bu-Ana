import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={{ padding: "15px", background: "#eee", display: "flex", gap: "20px" }}>
      <Link to="/">Barang</Link>
      <Link to="/transaksi">Transaksi</Link>
      <Link to="/riwayat">Riwayat</Link>
      <Link to="/rekap">Rekap</Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    backgroundColor: "#2d3436",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "25px",
    margin: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "0.3s",
  }
};

export default Navbar;