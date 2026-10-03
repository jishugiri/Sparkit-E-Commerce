const connectDB = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================

// Product routes
app.use("/api/products", productRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Sparkit API is running",
  });
});

// =========================
// PORT
// =========================

const PORT = process.env.PORT || 5000;

// =========================
// START SERVER
// =========================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );
  }
};

startServer();