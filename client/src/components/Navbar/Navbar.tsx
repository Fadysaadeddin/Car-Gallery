import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaUser, FaCar } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <FaCar size={24} />
        <span>Car Gallery</span>
      </div>
      <div className={styles.userSection}>
        <FaUser size={18} />
        <span>{user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
