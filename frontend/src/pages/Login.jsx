import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
       "https://sparkit-e-commerce.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "sparkitToken",
        response.data.token
      );

      localStorage.setItem(
        "sparkitUser",
        JSON.stringify(response.data.user)
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span>Sparkit</span>
        </Link>

        {/* Heading */}
        <h1 style={styles.title}>Welcome Back</h1>

        <p style={styles.subtitle}>
          Login to your Sparkit account
        </p>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              style={styles.input}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={styles.registerLink}
          >
            Create Account
          </Link>
        </p>

        {/* Back Home */}
        <Link
          to="/"
          style={styles.backLink}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    background:
      "linear-gradient(135deg, #f4f7fb 0%, #eaf1ff 100%)",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:
      "0 15px 45px rgba(15, 23, 42, 0.12)",
    boxSizing: "border-box",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    textDecoration: "none",
    color: "#172033",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "25px",
  },

  logoIcon: {
    fontSize: "38px",
    color: "#ff7a18",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#172033",
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    color: "#718096",
    fontSize: "15px",
    marginTop: "10px",
    marginBottom: "30px",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "12px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    marginBottom: "20px",
  },

  field: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#172033",
    fontSize: "14px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: "50px",
    padding: "0 15px",
    border: "1px solid #d7deea",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    color: "#172033",
    background: "#ffffff",
  },

  button: {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    marginTop: "5px",
    transition: "0.2s",
  },

  registerText: {
    textAlign: "center",
    color: "#718096",
    fontSize: "14px",
    marginTop: "25px",
  },

  registerLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },

  backLink: {
    display: "block",
    textAlign: "center",
    color: "#4a5568",
    fontSize: "14px",
    textDecoration: "none",
    marginTop: "20px",
  },
};

export default Login;