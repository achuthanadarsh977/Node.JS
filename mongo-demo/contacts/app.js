import "dotenv/config";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

const app = express();

// Connect to MongoDB
await connectDB();

// View engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  }),
);

// Make session data available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  res.locals.notify = req.session.notify || null;
  // Clear flash messages after reading
  delete req.session.success;
  delete req.session.error;
  delete req.session.notify;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/groups", groupRoutes);
app.use("/settings", settingsRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("partials/404", { title: "Page Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
