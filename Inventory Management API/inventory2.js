
const inventory1 = require('./inventory1')


const express = require('express')

const mongoose = require('mongoose')
const app = express()
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/inventory').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))



// --- Routes ---
app.use("/api/inventory", inventory1);

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});