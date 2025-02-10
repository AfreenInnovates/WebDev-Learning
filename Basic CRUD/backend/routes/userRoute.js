const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = express.Router();

// Middleware to ignore favicon.ico requests
router.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    return res.status(204).end();
  }
  next();
});

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deleteUser);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.patch("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
