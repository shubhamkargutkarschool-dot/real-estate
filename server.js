const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Updated connection for Railway Cloud Database
const db = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'jmyfYKrNRRPQSBIpswAkXTMysyXJKXQV', // Your Railway MySQL password
    database: 'railway', // Default DB name on Railway
    port: 11536
});

// IMPORTANT: Point to the 'public' folder for your HTML/CSS/JS files
app.use(express.static(path.join(__dirname, 'public'))); [cite: 3, 119]

// API to fetch properties from the 'listings' table
app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM listings', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Dynamic port for Railway deployment
const PORT = process.env.PORT || 3000; [cite: 120]
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
