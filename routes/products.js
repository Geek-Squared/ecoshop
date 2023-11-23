const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products fetched",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// get product by id
router.get("/:productId", (req, res, next) => {
  try {
    const id = req.params.productId;
    // return the whole product object not a message
    res.status(200).json({
      message: `Product ${id} fetched`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// create product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created",
        createdProduct: product,
      });
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({
        error: err,
      });
    });
});

// update product by id
router.patch("/:productId", (req, res, next) => {
  try {
    const id = req.params.productId;
    res.status(200).json({
      message: `Product ${id} updated`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
