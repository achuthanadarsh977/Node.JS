
const express = require("express")

const mongoose = require("mongoose")

const logisticrouter = require("./logistics1")

const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose
  .connect("mongodb://127.0.0.1:27017/logistics")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));


app.use("/api/logistics" , logisticrouter)

app.get("/" , (req,res) => {
    res.sendFile(path.join(__dirname , "logistics.html"))
})

const PORT = 5000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

