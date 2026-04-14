const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Cloud Connection Settings
const db = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'jmyfYKrNRRPQSBIpswAkXTMysyXJKXQV',
    database: 'railway', 
    port: 11536,
    connectTimeout: 10000 // Gives the cloud more time to connect
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.stack);
        return;
    }
    console.log('✅ Connected to Railway Database');
});

// Serve your frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM listings', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// The Port Fix for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});
