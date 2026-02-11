const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n⚔️  X-MEN: MUTANT KOMBAT ⚔️`);
  console.log(`Real-time fighting game at http://localhost:${PORT}`);
  console.log(
    `Controls: WASD move | J punch | K kick | L special | SPACE block`,
  );
  console.log(`Ready to fight!\n`);
});
