const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware 
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Proxy 
app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
}));

// Proxy middleware for ...
app.use('/product', authenticate, createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));