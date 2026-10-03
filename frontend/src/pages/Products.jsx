import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching products:",
          error
        );
      });
  }, []);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    const existingCart =
      JSON.parse(
        localStorage.getItem("sparkitCart")
      ) || [];

    const existingProduct =
      existingCart.find(
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

  return (
    <div className="products-page">

      {/* HEADER */}

      <div className="products-page-header">

        <Link
          to="/"
          className="back-link"
        >
          ← Back to Home
        </Link>

        <h1>All Products</h1>

        <p>
          Explore our collection of products.
        </p>

      </div>

      {/* PRODUCTS */}

      <div className="product-grid">

        {products.length > 0 ? (

          products.map((product) => (

            <div
              className="product-card"
              key={product._id}
              onClick={() =>
                navigate(
                  `/product/${product._id}`
                )
              }
            >

              {/* PRODUCT IMAGE */}

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              {/* PRODUCT INFORMATION */}

              <div className="product-info">

                <span className="category-name">
                  {product.category}
                </span>

                <h3>
                  {product.name}
                </h3>

                <p className="description">
                  {product.description}
                </p>

                <div className="rating">
                  ⭐ {product.rating}
                </div>

                <div className="price">
                  ₹{product.price}
                </div>

                <button
                  className="cart-button"
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

          ))

        ) : (

          <div className="no-products">
            No products available.
          </div>

        )}

      </div>

    </div>
  );
}

export default Products;