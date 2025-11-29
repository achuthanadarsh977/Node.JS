
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// --- 1. Mongoose Schema and Model Definition ---
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

// Create the Model
const Genre = mongoose.model('Genre', genreSchema);

// Export the Model so the router (project2.js) can use it
module.exports.Genre = Genre; 

// --- 2. Database Connection ---
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('✅ Connected to MongoDB...'))
  .catch(err => console.error('❌ Could not connect to MongoDB...', err));

// --- 3. Middleware and Routes ---
app.use(express.json());

// Import the router from project2.js and use it
const genresRouter = require('./project2'); 
app.use('/api/genres', genresRouter);

// --- 4. Server Start ---
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌍 Server running on http://localhost:${port}`));
