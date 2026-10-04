import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://sparkit-e-commerce.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        response.data.message ||
          "Account created successfully!"
      );

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(
          "Registration failed. Please try again."
        );
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
        <h1 style={styles.title}>
          Create Account
        </h1>

        <p style={styles.subtitle}>
          Create your Sparkit account
        </p>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              style={styles.input}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          {/* Button */}
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
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={styles.loginLink}
          >
            Login
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
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #f4f7fb 0%, #eaf1ff 100%)",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    padding: "38px 40px",
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
    marginBottom: "20px",
  },

  logoIcon: {
    fontSize: "38px",
    color: "#ff7a18",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#172033",
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    color: "#718096",
    fontSize: "15px",
    marginTop: "8px",
    marginBottom: "25px",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "12px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    marginBottom: "18px",
  },

  field: {
    marginBottom: "17px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    color: "#172033",
    fontSize: "14px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: "48px",
    padding: "0 14px",
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
    height: "50px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    marginTop: "5px",
  },

  loginText: {
    textAlign: "center",
    color: "#718096",
    fontSize: "14px",
    marginTop: "22px",
  },

  loginLink: {
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
    marginTop: "18px",
  },
};

export default Register;