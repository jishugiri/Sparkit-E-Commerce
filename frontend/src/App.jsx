import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  Search,
  ShoppingCart,
  LogOut,
  ArrowRight,
} from "lucide-react";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

import "./App.css";

/* =========================
   HOME PAGE
========================= */

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    fetchProducts();

    const savedUser =
      localStorage.getItem("sparkitUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://sparkit-e-commerce.onrender.com/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = (
    event,
    product
  ) => {
    event.stopPropagation();

    const existingCart =
      JSON.parse(
        localStorage.getItem("sparkitCart")
      ) || [];

    const existingProduct =
      existingCart.find(
        (item) =>
          item._id === product._id
      );

    let updatedCart;

    if (existingProduct) {
      updatedCart =
        existingCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
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

    alert(
      `${product.name} added to cart!`
    );
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "sparkitToken"
    );

    localStorage.removeItem(
      "sparkitUser"
    );

    setUser(null);

    navigate("/");
  };

  /* =========================
     SEARCH
  ========================= */

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* =========================
     PRODUCT CATEGORIES
  ========================= */

  const categories = [
    {
      name: "Mouse",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Airpods",
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Camera",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Earphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Mobiles",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Printers",
      image:
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Processor",
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Refrigerator",
      image:
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Speakers",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Televisions",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Trimmers",
      image:
        "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=300&q=85",
    },
    {
      name: "Watches",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=85",
    },
  ];

  return (
    <div className="sparkit-home">

      {/* HEADER */}

      <header className="main-header">

        <Link
          to="/"
          className="brand"
        >
          <span className="brand-icon">
            ⚡
          </span>

          <span>
            Sparkit
          </span>
        </Link>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          <button>
            <Search size={23} />
          </button>

        </div>

        <nav className="main-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/my-orders">
            My Orders
          </Link>

          <Link
            to="/cart"
            className="cart-link"
          >
            Cart

            <ShoppingCart
              size={20}
            />
          </Link>

          {user ? (
            <>
              <span className="user-name">
                Hi, {user.name}
              </span>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}

        </nav>

      </header>

      {/* CATEGORY SECTION */}

      <section className="category-section">

        <div className="category-container">

          {categories.map(
            (category) => (
              <div
                className="category-item"
                key={category.name}
                onClick={() =>
                  navigate(
                    `/products?category=${category.name}`
                  )
                }
              >

                <div className="category-icon">

                  <img
                    src={category.image}
                    alt={category.name}
                  />

                </div>

                <span>
                  {category.name}
                </span>

              </div>
            )
          )}

        </div>

      </section>

      {/* NEW COLLECTION BANNER */}

      <section className="new-collection">

        <div className="banner-content">

          <div className="banner-text">

            <span className="collection-label">
              NEW COLLECTION
            </span>

            <div className="banner-line"></div>

            <h1>
              Discover Your
              <br />
              Perfect{" "}
              <span>
                Products
              </span>
            </h1>

            <p>
              Shop the latest products
              at amazing prices.
            </p>

            <button
              onClick={() =>
                navigate("/products")
              }
            >
              Shop Now

              <ArrowRight
                size={20}
              />

            </button>

          </div>

          <div className="banner-products">

            <img
              className="banner-laptop"
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85"
              alt="Laptop"
            />

            <img
              className="banner-headphone"
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85"
              alt="Headphones"
            />

            <img
              className="banner-phone"
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=85"
              alt="Smartphone"
            />

            <img
              className="banner-camera"
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=450&q=85"
              alt="Camera"
            />

            <img
              className="banner-watch"
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=350&q=85"
              alt="Smart Watch"
            />

            <img
              className="banner-speaker"
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=85"
              alt="Speaker"
            />

          </div>

        </div>

      </section>

      {/* FEATURED PRODUCTS */}

      <section className="featured-section">

        <div className="section-heading">

          <div>

            <h2>
              Featured Products
            </h2>

            <p>
              Explore our latest products
            </p>

          </div>

          <Link
            to="/products"
            className="view-all"
          >
            View All

            <ArrowRight
              size={19}
            />

          </Link>

        </div>

        <div className="featured-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map(
              (product) => (

                <div
                  className="featured-card"
                  key={product._id}
                  onClick={() =>
                    navigate(
                      `/product/${product._id}`
                    )
                  }
                >

                  <div className="featured-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>

                  <div className="featured-info">

                    <span className="featured-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <div className="product-rating">
                      ⭐ {product.rating}
                    </div>

                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <button
                        onClick={(event) =>
                          handleAddToCart(
                            event,
                            product
                          )
                        }
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="no-products-home">

              <h3>
                No products found
              </h3>

              <p>
                Try another search.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="sparkit-footer">

        <div>

          <div className="footer-brand">
            ⚡ Sparkit
          </div>

          <p>
            Your destination for
            quality electronics and
            smart technology.
          </p>

        </div>

        <div>

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/my-orders">
            My Orders
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>

        <div>

          <h3>
            Categories
          </h3>

          <span>
            Mobiles
          </span>

          <span>
            Airpods
          </span>

          <span>
            Cameras
          </span>

          <span>
            Watches
          </span>

        </div>

      </footer>

    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;