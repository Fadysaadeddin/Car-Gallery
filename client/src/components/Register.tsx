import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import "../styles/Register.css";

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

  return (
    <>
      <h1 className="register">Register a User</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register">Register</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="register-input"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="register-input"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>

        <button type="button" className="google-auth-button">
          Register with Google
        </button>

        {registered && (
          <p className="register-success">{form.name} created successfully</p>
        )}
        {loading && <p>Registering...</p>}
        {error && <p className="error">{error}</p>}
      </form>
      <div className="login-link">
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}
