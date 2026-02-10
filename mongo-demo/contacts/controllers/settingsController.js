import bcrypt from "bcrypt";
import User from "../models/User.js";

// GET /settings
export const getSettings = (req, res) => {
  res.render("settings/settings", { title: "Settings" });
};

// GET /settings/change-email
export const getChangeEmail = (req, res) => {
  res.render("settings/change-email", { title: "Change Email" });
};

// POST /settings/change-email
export const postChangeEmail = async (req, res) => {
  const userId = req.session.user._id;
  const { email } = req.body;

  if (!email || !email.trim()) {
    req.session.error = "Please enter your email.";
    return res.redirect("/settings/change-email");
  }

  // Check if email is already taken by another user
  const existing = await User.findOne({
    email: email.toLowerCase().trim(),
    _id: { $ne: userId },
  });
  if (existing) {
    req.session.error = "This email already exists.";
    return res.redirect("/settings/change-email");
  }

  await User.updateOne({ _id: userId }, { email: email.toLowerCase().trim() });
  req.session.user.email = email.toLowerCase().trim();

  req.session.success = `Update successful. New email: ${email.toLowerCase().trim()}`;
  res.redirect("/settings/change-email");
};

// GET /settings/change-password
export const getChangePassword = (req, res) => {
  res.render("settings/change-password", { title: "Change Your Password" });
};

// POST /settings/change-password
export const postChangePassword = async (req, res) => {
  const userId = req.session.user._id;
  const { password1, password2 } = req.body;

  if (!password1 || !/(?=.*[0-9])(?=.*[a-z])^[a-z0-9]{6,20}$/.test(password1)) {
    req.session.error = "Please enter a valid password!";
    return res.redirect("/settings/change-password");
  }

  if (password1 !== password2) {
    req.session.error = "Your password did not match the confirmed password!";
    return res.redirect("/settings/change-password");
  }

  const hashed = await bcrypt.hash(password1, 10);
  await User.updateOne({ _id: userId }, { password: hashed });

  req.session.success = "Password changed successfully.";
  res.redirect("/settings/change-password");
};
