// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text({ type: 'application/xml' }));

// Set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can specify specific origins instead of '*' if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request from ${req.ip} to ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

app.post('/xml', (req, res) => {
    console.log('Received XML request:');
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
