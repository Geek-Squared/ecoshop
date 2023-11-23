var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    // get all users from database
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// create user
router.post("/", (req, res, next) => {
  try {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          createdUser: user,
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

// get user by id
router.get("/:userId", (req, res, next) => {
  try {
    const id = req.params.userId;
    // return the whole user object not a message
    res.status(200).json({
      message: `User ${id} fetched`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// update user by id
router.patch("/:userId", (req, res, next) => {
  try {
    const id = req.params.userId;
    res.status(200).json({
      message: `User ${id} updated`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
