const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");

router.get("/", async (req, res, next) => {
  try {
    // fetch all orders from database
    const orders = await Order.find();
    res.status(200).json({
      message: "Orders fetched",
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// create order
router.post("/", (req, res, next) => {
  try {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    order
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Order stored",
          createdOrder: order,
        });
      })
      .catch((err) => {
        console.error(err); // Log the error
        res.status(500).json({
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// get order by id
router.get("/:orderId", (req, res, next) => {
  try {
    const id = req.params.orderId;
    // return the whole order object not a message
    res.status(200).json({
      message: `Order ${id} fetched`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// delete order by id
router.delete("/:orderId", (req, res, next) => {
  try {
    const id = req.params.orderId;
    res.status(200).json({
      message: `Order ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
