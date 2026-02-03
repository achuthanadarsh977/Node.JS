const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    page: "login",
  });
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      req.flash("error_msg", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    req.flash("success_msg", "Welcome back!");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error logging in");
    res.redirect("/auth/login");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    page: "register",
  });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error_msg", "User already exists");
      return res.redirect("/auth/register");
    }

    const user = new User({
      name,
      email,
      password,
      role: "Viewer",
    });

    await user.save();
    req.flash("success_msg", "Registration successful. Please login.");
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error registering");
    res.redirect("/auth/register");
  }
});

module.exports = router;
