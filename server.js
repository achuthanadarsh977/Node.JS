const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'comedy' },
    { id: 3, name: 'horror' }
];

// GET all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// GET genre by ID
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

// POST create new genre
app.post('/api/genres', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send("Name must be at least 3 characters");
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

// PUT update genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send("Name must be at least 3 characters");
    }

    genre.name = req.body.name;
    res.send(genre);
});

// DELETE genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    genres = genres.filter(g => g.id !== genre.id);
    res.send(genre);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express running at http://localhost:${port}`);
});
