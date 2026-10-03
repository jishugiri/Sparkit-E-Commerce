import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://sparkit-e-commerce.onrender.com/api/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(
          "Error fetching product:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("sparkitCart")
      ) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "sparkitCart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingText}>
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.errorPage}>
        <h2>Product not found</h2>

        <Link
          to="/products"
          style={styles.backButton}
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Back */}
      <div style={styles.topBar}>
        <Link
          to="/products"
          style={styles.backLink}
        >
          ← Back to Products
        </Link>
      </div>

      {/* Product */}
      <div style={styles.container}>

        {/* Image */}
        <div style={styles.imageSection}>
          <div style={styles.imageBox}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />
          </div>
        </div>

        {/* Information */}
        <div style={styles.infoSection}>

          <span style={styles.category}>
            {product.category}
          </span>

          <h1 style={styles.title}>
            {product.name}
          </h1>

          <div style={styles.rating}>
            ⭐ {product.rating}
            <span style={styles.ratingText}>
              / 5
            </span>
          </div>

          <p style={styles.description}>
            {product.description}
          </p>

          <div style={styles.price}>
            ₹{product.price}
          </div>

          <div style={styles.stock}>
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : "Out of Stock"}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            style={{
              ...styles.cartButton,
              opacity:
                product.stock <= 0 ? 0.5 : 1,
              cursor:
                product.stock <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            🛒 Add to Cart
          </button>

          <Link
            to="/cart"
            style={styles.viewCart}
          >
            View Cart →
          </Link>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "#f4f7fb",
    padding: "25px 20px 60px",
    boxSizing: "border-box",
  },

  topBar: {
    maxWidth: "1200px",
    margin: "0 auto 25px",
  },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "35px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) minmax(0, 1fr)",
    gap: "50px",
    boxShadow:
      "0 10px 35px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  },

  imageSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageBox: {
    width: "100%",
    height: "430px",
    background: "#f1f5f9",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "20px",
    boxSizing: "border-box",
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  category: {
    color: "#64748b",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  title: {
    color: "#172033",
    fontSize: "34px",
    lineHeight: "1.2",
    margin: "0 0 15px",
  },

  rating: {
    color: "#f59e0b",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  ratingText: {
    color: "#64748b",
    fontSize: "14px",
    marginLeft: "4px",
  },

  description: {
    color: "#64748b",
    fontSize: "16px",
    lineHeight: "1.7",
    marginBottom: "20px",
  },

  price: {
    color: "#ef2929",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "12px",
  },

  stock: {
    color: "#16a34a",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "25px",
  },

  cartButton: {
    width: "100%",
    maxWidth: "300px",
    height: "52px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
  },

  viewCart: {
    display: "inline-block",
    marginTop: "18px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },

  loadingPage: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f7fb",
  },

  loadingText: {
    color: "#2563eb",
    fontSize: "18px",
    fontWeight: "600",
  },

  errorPage: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default ProductDetails;