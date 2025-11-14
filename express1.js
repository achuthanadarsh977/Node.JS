const express = require("express");
const app = express();

app.use(express.json()); // allow JSON body

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alex" }
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const newUser = { id: Date.now(), name: req.body.name };
  users.push(newUser);
  res.json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.map(u => u.id == id ? { ...u, name: req.body.name } : u);
  res.json({ message: "Updated" });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter(u => u.id != id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("API running on port 3000"));
