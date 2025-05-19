import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

export default function Register() {
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
      await axios.post("/api/users/register", form);
      setRegistered(true);
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
      </form>
    </>
  );
}
