const express = require("express");
const router = express.Router();
const { Product, validateProduct } = require("./inventory");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort("-dateAdded");
  res.send(products);
});

// POST new product
router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  });

  // Add price history
  product.priceHistory.push({ price: req.body.price });

  product = await product.save();
  res.send(product);
});

// UPDATE product
router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");

  // Track price change
  if (req.body.price && req.body.price !== product.price) {
    product.priceHistory.push({ price: product.price });
  }

  product.name = req.body.name || product.name;
  product.category = req.body.category || product.category;
  product.price = req.body.price || product.price;
  product.stock = req.body.stock || product.stock;

  await product.save();
  res.send(product);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Product not found");

  res.send({ message: "Product deleted" });
});

module.exports = router;