import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log in to continue</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>Register</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    marginBottom: "5px",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#7f8c8d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #dcdde1",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2980b9",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
  },
  buttonHover: {
    background: "#1c6ea4",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#7f8c8d",
  },
  link: {
    color: "#2980b9",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
