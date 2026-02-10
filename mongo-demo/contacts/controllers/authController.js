import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";

// GET /signin
export const getSignin = (req, res) => {
  res.render("auth/signin", { title: "RAINBOW - Sign In" });
};

// POST /signin
export const postSignin = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    req.session.error = "Please enter your email and password.";
    return res.redirect("/signin");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    req.session.error =
      'Could not verify this account. The email and password do not match those on file. <a href="/forgot-password">Forgot password?</a>';
    return res.redirect("/signin");
  }

  const match = await bcrypt.compare(pass, user.password);
  if (!match) {
    req.session.error =
      'Could not verify this account. The email and password do not match those on file. <a href="/forgot-password">Forgot password?</a>';
    return res.redirect("/signin");
  }

  req.session.user = {
    _id: user._id,
    email: user.email,
    status: user.status,
  };
  res.redirect("/contacts");
};

// GET /signup
export const getSignup = (req, res) => {
  res.render("auth/signup", { title: "RAINBOW - Sign Up Now" });
};

// POST /signup
export const postSignup = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    req.session.error = "Please enter a valid email address!";
    return res.redirect("/signup");
  }

  if (!pass || !/(?=.*[0-9])(?=.*[a-z])^[a-z0-9]{6,20}$/.test(pass)) {
    req.session.error =
      "Password must include at least one number, one letter and must be between 6 and 20 characters!";
    return res.redirect("/signup");
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    req.session.notify =
      'This email address has already been registered. <a href="/forgot-password">Forgot Password?</a>';
    return res.redirect("/signup");
  }

  const hashed = await bcrypt.hash(pass, 10);
  const user = await User.create({
    email: email.toLowerCase().trim(),
    password: hashed,
  });

  req.session.user = {
    _id: user._id,
    email: user.email,
    status: user.status,
  };
  res.redirect("/contacts");
};

// GET /forgot-password
export const getForgotPassword = (req, res) => {
  res.render("auth/forgot-password", { title: "Reset Your Password" });
};

// POST /forgot-password
export const postForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    req.session.error = "You forgot to enter your email address!";
    return res.redirect("/forgot-password");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    req.session.error =
      "The submitted email address does not match any on file.";
    return res.redirect("/forgot-password");
  }

  // Generate a random temporary password
  const tempPass = crypto.randomBytes(5).toString("hex");
  const hashed = await bcrypt.hash(tempPass, 10);
  await User.updateOne({ _id: user._id }, { password: hashed });

  // In production, send email. In dev, show on screen.
  req.session.success = `Your password has been reset. Your temporary password is: <strong>${tempPass}</strong>. Please sign in and change your password.`;
  res.redirect("/forgot-password");
};

// GET /logout
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/signin");
  });
};
