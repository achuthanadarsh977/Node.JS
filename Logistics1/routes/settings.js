const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Settings page - User Management
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("settings/index", {
      title: "Settings",
      page: "settings",
      tab: "users",
      users,
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error fetching users");
    res.redirect("/");
  }
});

// Add new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error_msg", "User with this email already exists");
      return res.redirect("/settings");
    }

    const user = new User({
      name,
      email,
      password,
      role,
      status,
    });

    await user.save();
    req.flash("success_msg", "User created successfully");
    res.redirect("/settings");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error creating user");
    res.redirect("/settings");
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      role,
      status,
    });

    req.flash("success_msg", "User updated successfully");
    res.redirect("/settings");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error updating user");
    res.redirect("/settings");
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "User deleted successfully");
    res.redirect("/settings");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error deleting user");
    res.redirect("/settings");
  }
});

module.exports = router;
