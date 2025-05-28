import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user.id) {
      navigate("/login");
    }
  }, [token, user.id, navigate]);

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1>Welcome to Car Gallery!</h1>
      </main>
    </div>
  );
};

export default Home;
