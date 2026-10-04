import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              quantity:
                (item.quantity || 1) + 1,
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
    <div
      style={{
        ...styles.page,
        ...(isMobile ? styles.mobilePage : {}),
      }}
    >
      {/* BACK BUTTON */}
      <div
        style={{
          ...styles.topBar,
          ...(isMobile ? styles.mobileTopBar : {}),
        }}
      >
        <Link
          to="/products"
          style={styles.backLink}
        >
          ← Back to Products
        </Link>
      </div>

      {/* PRODUCT CARD */}
      <div
        style={{
          ...styles.container,
          ...(isMobile
            ? styles.mobileContainer
            : {}),
        }}
      >
        {/* PRODUCT IMAGE */}
        <div
          style={{
            ...styles.imageSection,
            ...(isMobile
              ? styles.mobileImageSection
              : {}),
          }}
        >
          <div
            style={{
              ...styles.imageBox,
              ...(isMobile
                ? styles.mobileImageBox
                : {}),
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                ...styles.image,
                ...(isMobile
                  ? styles.mobileImage
                  : {}),
              }}
            />
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div
          style={{
            ...styles.infoSection,
            ...(isMobile
              ? styles.mobileInfoSection
              : {}),
          }}
        >
          <span
            style={{
              ...styles.category,
              ...(isMobile
                ? styles.mobileCategory
                : {}),
            }}
          >
            {product.category}
          </span>

          <h1
            style={{
              ...styles.title,
              ...(isMobile
                ? styles.mobileTitle
                : {}),
            }}
          >
            {product.name}
          </h1>

          {/* RATING */}
          <div
            style={{
              ...styles.rating,
              ...(isMobile
                ? styles.mobileRating
                : {}),
            }}
          >
            ⭐ {product.rating}
            <span style={styles.ratingText}>
              / 5
            </span>
          </div>

          {/* DESCRIPTION */}
          <p
            style={{
              ...styles.description,
              ...(isMobile
                ? styles.mobileDescription
                : {}),
            }}
          >
            {product.description}
          </p>

          {/* PRICE */}
          <div
            style={{
              ...styles.price,
              ...(isMobile
                ? styles.mobilePrice
                : {}),
            }}
          >
            ₹{product.price}
          </div>

          {/* STOCK */}
          <div
            style={{
              ...styles.stock,
              ...(isMobile
                ? styles.mobileStock
                : {}),
              color:
                product.stock > 0
                  ? "#16a34a"
                  : "#dc2626",
            }}
          >
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : "✕ Out of Stock"}
          </div>

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            style={{
              ...styles.cartButton,
              ...(isMobile
                ? styles.mobileCartButton
                : {}),
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

          {/* VIEW CART */}
          <Link
            to="/cart"
            style={{
              ...styles.viewCart,
              ...(isMobile
                ? styles.mobileViewCart
                : {}),
            }}
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

  mobilePage: {
    padding: "20px 12px 45px",
  },

  topBar: {
    maxWidth: "1200px",
    margin: "0 auto 25px",
  },

  mobileTopBar: {
    margin: "0 auto 18px",
    padding: "0 5px",
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

  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "20px 16px 28px",
    borderRadius: "20px",
    width: "100%",
    boxSizing: "border-box",
  },

  imageSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
  },

  mobileImageSection: {
    width: "100%",
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

  mobileImageBox: {
    width: "100%",
    height: "280px",
    maxWidth: "100%",
    borderRadius: "14px",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "20px",
    boxSizing: "border-box",
  },

  mobileImage: {
    padding: "18px",
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },

  mobileInfoSection: {
    width: "100%",
    minWidth: 0,
  },

  category: {
    color: "#64748b",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  mobileCategory: {
    fontSize: "14px",
    marginBottom: "7px",
  },

  title: {
    color: "#172033",
    fontSize: "34px",
    lineHeight: "1.2",
    margin: "0 0 15px",
  },

  mobileTitle: {
    fontSize: "28px",
    lineHeight: "1.2",
    margin: "0 0 12px",
    wordBreak: "break-word",
  },

  rating: {
    color: "#f59e0b",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  mobileRating: {
    fontSize: "17px",
    marginBottom: "15px",
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

  mobileDescription: {
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 18px",
  },

  price: {
    color: "#ef2929",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "12px",
  },

  mobilePrice: {
    fontSize: "29px",
    marginBottom: "10px",
  },

  stock: {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "25px",
  },

  mobileStock: {
    fontSize: "14px",
    marginBottom: "20px",
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

  mobileCartButton: {
    width: "100%",
    maxWidth: "100%",
    height: "54px",
    fontSize: "16px",
    borderRadius: "10px",
  },

  viewCart: {
    display: "inline-block",
    marginTop: "18px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },

  mobileViewCart: {
    textAlign: "center",
    marginTop: "16px",
    fontSize: "15px",
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
    padding: "20px",
    textAlign: "center",
  },

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default ProductDetails;