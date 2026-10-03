import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart =
      JSON.parse(
        localStorage.getItem("sparkitCart")
      ) || [];

    setCart(savedCart);

    const savedUser =
      localStorage.getItem("sparkitUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setFormData((previous) => ({
          ...previous,
          name: user.name || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error(
          "Failed to read user:",
          error
        );
      }
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || "",
      }));

      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },

        items: orderItems,

        totalAmount: totalPrice,

        paymentMethod:
          paymentMethod === "cod"
            ? "Cash on Delivery"
            : "Online Payment",
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      console.log(
        "Order created:",
        response.data
      );

      alert(
        "Order placed successfully! 🎉"
      );

      localStorage.removeItem(
        "sparkitCart"
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      if (error.response?.data?.message) {
        alert(
          error.response.data.message
        );
      } else {
        alert(
          "Failed to place order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      {/* HEADER */}

      <div className="checkout-header">

        <Link
          to="/cart"
          className="checkout-back"
        >
          ← Back to Cart
        </Link>

        <div className="checkout-brand">
          <span>⚡</span>
          Sparkit
        </div>

      </div>

      {/* TITLE */}

      <div className="checkout-title">

        <h1>
          Checkout
        </h1>

        <p>
          Complete your order securely
        </p>

      </div>

      {cart.length === 0 ? (

        /* EMPTY CART */

        <div className="checkout-empty">

          <div className="checkout-empty-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products before
            proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="checkout-shop-button"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <form
          className="checkout-container"
          onSubmit={handlePlaceOrder}
        >

          {/* LEFT SIDE */}

          <div className="checkout-left">

            {/* DELIVERY */}

            <div className="checkout-card">

              <div className="checkout-card-title">

                <div className="checkout-number">
                  1
                </div>

                <div>
                  <h2>
                    Delivery Information
                  </h2>

                  <p>
                    Enter your delivery details
                  </p>
                </div>

              </div>

              <div className="checkout-form-grid">

                <div className="checkout-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="checkout-field checkout-full">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    placeholder="Enter PIN code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="checkout-card">

              <div className="checkout-card-title">

                <div className="checkout-number">
                  2
                </div>

                <div>
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose your preferred
                    payment method
                  </p>
                </div>

              </div>

              <div className="payment-options">

                {/* COD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "cod"
                      ? "payment-selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="payment-icon">
                    💵
                  </div>

                  <div className="payment-text">

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                </label>

                {/* ONLINE */}

                <label
                  className={`payment-option ${
                    paymentMethod === "online"
                      ? "payment-selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={
                      paymentMethod === "online"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="payment-icon">
                    💳
                  </div>

                  <div className="payment-text">

                    <strong>
                      Online Payment
                    </strong>

                    <span>
                      Pay securely using card or UPI
                    </span>

                  </div>

                </label>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="checkout-right">

            <div className="checkout-summary">

              <h2>
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="summary-products">

                {cart.map((item) => (

                  <div
                    className="summary-product"
                    key={item._id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="summary-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <strong>
                      ₹
                      {Number(item.price) *
                        Number(item.quantity)}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="summary-divider" />

              <div className="summary-line">

                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>

              <div className="summary-line">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>

              <div className="summary-line">

                <span>
                  Delivery
                </span>

                <span className="free-text">
                  FREE
                </span>

              </div>

              <div className="summary-divider" />

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>

              <button
                type="submit"
                className="place-order-button"
                disabled={loading}
              >
                {loading
                  ? "Placing Order..."
                  : "🔒 Place Order"}
              </button>

              <div className="secure-checkout">
                🔐 Secure Checkout
              </div>

            </div>

          </div>

        </form>
      )}

    </div>
  );
}

export default Checkout;