import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://sparkit-e-commerce.onrender.com/api/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>
          ← Back to Home
        </Link>

        <h1 style={styles.title}>All Products</h1>

        <p style={styles.subtitle}>
          Explore our collection of products.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div style={styles.message}>
          {error}
        </div>
      )}

      {/* PRODUCTS */}
      {!error && products.length > 0 && (
        <div style={styles.grid}>
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={styles.cardLink}
            >
              <div style={styles.card}>
                <div style={styles.imageBox}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                  />
                </div>

                <div style={styles.category}>
                  {product.category}
                </div>

                <h2 style={styles.productName}>
                  {product.name}
                </h2>

                <div style={styles.rating}>
                  ⭐ {product.rating}
                  <span style={styles.ratingText}>
                    / 5
                  </span>
                </div>

                <p style={styles.description}>
                  {product.description}
                </p>

                <div style={styles.bottom}>
                  <span style={styles.price}>
                    ₹{product.price}
                  </span>

                  <span
                    style={{
                      ...styles.stock,
                      color:
                        product.stock > 0
                          ? "#16a34a"
                          : "#dc2626",
                    }}
                  >
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>

                <button
                  type="button"
                  style={styles.viewButton}
                >
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* NO PRODUCTS */}
      {!error && products.length === 0 && (
        <div style={styles.empty}>
          <h2>No products available.</h2>
          <p>Please try again later.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "#f4f7fb",
    padding: "30px 20px 60px",
    boxSizing: "border-box",
  },

  header: {
    maxWidth: "1200px",
    margin: "0 auto 35px",
  },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
  },

  title: {
    margin: "22px 0 8px",
    color: "#172033",
    fontSize: "40px",
    fontWeight: "700",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "18px",
  },

  grid: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "22px",
  },

  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "18px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.07)",
    boxSizing: "border-box",
    height: "100%",
    transition: "0.2s",
  },

  imageBox: {
    width: "100%",
    height: "220px",
    background: "#f1f5f9",
    borderRadius: "14px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "12px",
    boxSizing: "border-box",
  },

  category: {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  productName: {
    margin: "0 0 8px",
    color: "#172033",
    fontSize: "20px",
    lineHeight: "1.3",
  },

  rating: {
    color: "#f59e0b",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  ratingText: {
    color: "#64748b",
    marginLeft: "3px",
  },

  description: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.5",
    minHeight: "42px",
    margin: "0 0 15px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },

  price: {
    color: "#ef2929",
    fontSize: "21px",
    fontWeight: "800",
  },

  stock: {
    fontSize: "13px",
    fontWeight: "600",
  },

  viewButton: {
    width: "100%",
    height: "45px",
    border: "none",
    borderRadius: "9px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },

  loading: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2563eb",
    fontSize: "18px",
    fontWeight: "600",
  },

  message: {
    maxWidth: "600px",
    margin: "60px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "16px",
    textAlign: "center",
    color: "#dc2626",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.07)",
  },

  empty: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "50px 20px",
    background: "#ffffff",
    borderRadius: "18px",
    textAlign: "center",
    color: "#64748b",
  },
};

export default Products;