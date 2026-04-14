const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', 
    database: 'mumbai_real_estate'
});

// IMPORTANT: Point to the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM listings', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});