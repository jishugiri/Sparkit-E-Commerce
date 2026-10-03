const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (
      !customer ||
      !items ||
      items.length === 0 ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Missing required order information",
      });
    }

    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod:
        paymentMethod || "Cash on Delivery",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Order creation error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});


// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});


module.exports = router;