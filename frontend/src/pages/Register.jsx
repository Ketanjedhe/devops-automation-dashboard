import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "No password", color: "#cbd5e0" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    const strengths = [
      { score: 1, label: "Weak", color: "#fc8181" },
      { score: 2, label: "Fair", color: "#f6ad55" },
      { score: 3, label: "Good", color: "#f6e05e" },
      { score: 4, label: "Strong", color: "#9ae6b4" },
      { score: 5, label: "Very Strong", color: "#68d391" },
    ];
    return strengths[score - 1] || strengths[0];
  };

  const passwordStrength = getPasswordStrength(password);
  const isPasswordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Registration failed. Please try again."
      );
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
          <div style={styles.logo}>🚀</div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join DevOps Dashboard</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>👤</span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

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
            {password && (
              <div style={styles.strengthContainer}>
                <div
                  style={{
                    ...styles.strengthBar,
                    background: passwordStrength.color,
                    width: `${(passwordStrength.score / 5) * 100}%`,
                  }}
                ></div>
                <span
                  style={{
                    ...styles.strengthLabel,
                    color: passwordStrength.color,
                  }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.togglePassword}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {confirmPassword && (
              <div
                style={{
                  ...styles.matchIndicator,
                  color: passwordsMatch ? "#48bb78" : "#f56565",
                }}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled),
            }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.footer}>
          Already have an account?{" "}
          <a href="/" style={styles.link}>
            Sign in
          </a>
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
    background:
      "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  card: {
    width: "450px",
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
  strengthContainer: {
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  strengthBar: {
    height: "4px",
    borderRadius: "2px",
    flex: 1,
    transition: "all 0.3s ease",
  },
  strengthLabel: {
    fontSize: "12px",
    fontWeight: "600",
    minWidth: "70px",
    textAlign: "right",
  },
  matchIndicator: {
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  button: {
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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

export default Register;
