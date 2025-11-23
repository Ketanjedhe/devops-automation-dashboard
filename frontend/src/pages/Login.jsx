import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.background}></div>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔐</div>
          <h1 style={styles.title}>DevOps Dashboard</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>✉️</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.togglePassword}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{...styles.button, ...(loading && styles.buttonDisabled)}}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>Create one</a>
        </p>
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  card: {
    width: "420px",
    padding: "50px 40px",
    borderRadius: "20px",
    background: "#ffffff",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    animation: "slideUp 0.6s ease-out",
    position: "relative",
    zIndex: 1,
  },
  header: {
    marginBottom: "30px",
  },
  logo: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a202c",
    margin: "10px 0 5px 0",
  },
  subtitle: {
    fontSize: "15px",
    color: "#718096",
    margin: 0,
  },
  errorBox: {
    padding: "12px 16px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#fed7d7",
    color: "#c53030",
    fontSize: "14px",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "8px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "14px",
    fontSize: "16px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 42px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    outline: "none",
  },
  togglePassword: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px 8px",
  },
  button: {
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "20px 0",
  },
  footer: {
    marginTop: "0",
    fontSize: "14px",
    color: "#718096",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};

export default Login;
