import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/shared/AuthForms.module.css";

export default function Register() {
  const navigate = useNavigate();
  const { executeRequest, loading, error } = useApi();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await executeRequest("register", "POST", form);

      if (response?.status === 201) {
        setRegistered(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setRegistered(false);
    }
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google registration
    console.log("Google register clicked");
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

      

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
  {loading && <p className={styles.loading}>Creating account...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {registered && (
          <p className={styles.success}>{form.name} registered successfully!</p>
        )}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleRegister}
        >
          <FcGoogle size={20} />
          Register with Google
        </button>

        <div className={styles.linkContainer}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
