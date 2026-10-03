import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 700
  );

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("sparkitCart")) || [];

    setCart(savedCart);
  }, []);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: Math.max(1, item.quantity + change),
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "sparkitCart",
      JSON.stringify(updatedCart)
    );
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "sparkitCart",
      JSON.stringify(updatedCart)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>
          ← Continue Shopping
        </Link>

        <h1 style={styles.title}>Shopping Cart</h1>

        {cart.length > 0 && (
          <p style={styles.subtitle}>
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        )}
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <div style={styles.emptyIcon}>🛒</div>

          <h2 style={styles.emptyTitle}>
            Your cart is empty
          </h2>

          <p style={styles.emptyText}>
            Add some products to your cart to continue
            shopping.
          </p>

          <Link to="/products" style={styles.shopButton}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div
          style={{
            ...styles.container,
            ...(isMobile
              ? styles.mobileContainer
              : {}),
          }}
        >
          {/* CART ITEMS */}
          <div style={styles.itemsSection}>
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  ...styles.cartItem,
                  ...(isMobile
                    ? styles.mobileCartItem
                    : {}),
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    ...styles.imageBox,
                    ...(isMobile
                      ? styles.mobileImageBox
                      : {}),
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />
                </div>

                {/* PRODUCT INFORMATION */}
                <div style={styles.productInfo}>
                  <span style={styles.category}>
                    {item.category}
                  </span>

                  <h2
                    style={{
                      ...styles.productName,
                      ...(isMobile
                        ? styles.mobileProductName
                        : {}),
                    }}
                  >
                    {item.name}
                  </h2>

                  <p style={styles.price}>
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div style={styles.quantityRow}>
                    <span style={styles.quantityLabel}>
                      Quantity:
                    </span>

                    <div style={styles.quantityControls}>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, -1)
                        }
                        style={styles.quantityButton}
                      >
                        −
                      </button>

                      <span style={styles.quantity}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, 1)
                        }
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div
                  style={{
                    ...styles.itemTotal,
                    ...(isMobile
                      ? styles.mobileItemTotal
                      : {}),
                  }}
                >
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div
            style={{
              ...styles.summary,
              ...(isMobile
                ? styles.mobileSummary
                : {}),
            }}
          >
            <h2 style={styles.summaryTitle}>
              Order Summary
            </h2>

            <div style={styles.summaryRow}>
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Delivery</span>
              <span style={styles.free}>FREE</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span>Total</span>

              <strong style={styles.total}>
                ₹{totalPrice}
              </strong>
            </div>

            <button
              onClick={handleCheckout}
              style={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              style={styles.continueLink}
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "#f4f7fb",
    padding: "35px 20px 70px",
    boxSizing: "border-box",
  },

  header: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto 30px",
  },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
  },

  title: {
    margin: "18px 0 5px",
    color: "#172033",
    fontSize: "34px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "0",
    color: "#64748b",
    fontSize: "15px",
  },

  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 350px",
    gap: "25px",
    alignItems: "start",
  },

  /* MOBILE CONTAINER */
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "18px",
  },

  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "0",
    width: "100%",
  },

  cartItem: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "18px",
    display: "grid",
    gridTemplateColumns:
      "130px minmax(0, 1fr) auto",
    gap: "20px",
    alignItems: "center",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.07)",
    boxSizing: "border-box",
  },

  /* MOBILE CART ITEM */
  mobileCartItem: {
    gridTemplateColumns: "80px minmax(0, 1fr)",
    gap: "12px",
    padding: "12px",
    width: "100%",
    boxSizing: "border-box",
  },

  imageBox: {
    width: "130px",
    height: "130px",
    background: "#f1f5f9",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: "0",
  },

  mobileImageBox: {
    width: "80px",
    height: "80px",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "10px",
    boxSizing: "border-box",
  },

  productInfo: {
    minWidth: "0",
  },

  category: {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
  },

  productName: {
    color: "#172033",
    fontSize: "19px",
    margin: "7px 0",
    lineHeight: "1.35",
  },

  mobileProductName: {
    fontSize: "16px",
    lineHeight: "1.3",
    wordBreak: "break-word",
    margin: "5px 0",
  },

  price: {
    color: "#ef2929",
    fontSize: "19px",
    fontWeight: "700",
    margin: "5px 0 12px",
  },

  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  quantityLabel: {
    color: "#64748b",
    fontSize: "14px",
  },

  quantityControls: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d7deea",
    borderRadius: "8px",
    overflow: "hidden",
  },

  quantityButton: {
    width: "34px",
    height: "32px",
    border: "none",
    background: "#f8fafc",
    color: "#172033",
    fontSize: "18px",
    cursor: "pointer",
  },

  quantity: {
    minWidth: "35px",
    textAlign: "center",
    fontWeight: "600",
    color: "#172033",
  },

  removeButton: {
    marginTop: "10px",
    border: "none",
    background: "transparent",
    color: "#ef2929",
    fontSize: "13px",
    cursor: "pointer",
    padding: "0",
  },

  itemTotal: {
    color: "#172033",
    fontSize: "18px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    alignSelf: "start",
    paddingTop: "5px",
  },

  /* MOBILE ITEM TOTAL */
  mobileItemTotal: {
    gridColumn: "1 / -1",
    width: "100%",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "10px",
    textAlign: "right",
    boxSizing: "border-box",
  },

  summary: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.07)",
    boxSizing: "border-box",
    position: "sticky",
    top: "20px",
  },

  /* IMPORTANT MOBILE FIX */
  mobileSummary: {
    position: "static",
    width: "100%",
    margin: "0",
    padding: "20px",
    boxSizing: "border-box",
    order: "2",
  },

  summaryTitle: {
    margin: "0 0 20px",
    color: "#172033",
    fontSize: "22px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    color: "#64748b",
    fontSize: "15px",
  },

  free: {
    color: "#16a34a",
    fontWeight: "700",
  },

  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "20px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#172033",
    fontSize: "18px",
    marginBottom: "20px",
  },

  total: {
    fontSize: "24px",
  },

  checkoutButton: {
    width: "100%",
    minHeight: "50px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "0 15px",
  },

  continueLink: {
    display: "block",
    textAlign: "center",
    marginTop: "15px",
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },

  emptyCart: {
    width: "100%",
    maxWidth: "600px",
    margin: "70px auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "50px 25px",
    textAlign: "center",
    boxShadow:
      "0 10px 35px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  },

  emptyIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  emptyTitle: {
    color: "#172033",
    margin: "0 0 10px",
  },

  emptyText: {
    color: "#64748b",
    marginBottom: "25px",
  },

  shopButton: {
    display: "inline-block",
    background: "#2563eb",
    color: "#ffffff",
    padding: "12px 25px",
    borderRadius: "9px",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Cart;