// app.js
const express = require('express');
const fs = require('fs');
const path = express();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    // Read notes from a JSON file and send them as a response
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'notes.json'), 'utf-8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // Add a new note to the JSON file
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'notes.json'), 'utf-8'));
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'notes.json'), JSON.stringify(notes));
    res.json(notes);
});

// Start the server

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

