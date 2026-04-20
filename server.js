// server.js - Main Entry Point

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./src/config/db');

// MongoDB connect
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes      = require('./src/routes/auth.routes');
const userRoutes      = require('./src/routes/user.routes');
const paymentRoutes   = require('./src/routes/payment.routes');
const adminRoutes     = require('./src/routes/admin.routes');
const biometricRoutes = require('./src/routes/biometric.routes');
const kycRoutes       = require('./src/routes/kyc.routes');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', paymentRoutes);
app.use('/api', adminRoutes);
app.use('/api', biometricRoutes);
app.use('/api', kycRoutes);

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin panel — BEFORE static middleware
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname)));
app.use('/static', express.static(path.join(__dirname, 'static')));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`✅ Paylance Server: http://localhost:${PORT}`);
//     console.log(`💳 JazzCash: Sandbox Mode`);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Paylance Server: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://192.168.0.106:${PORT}`);
    console.log(`💳 JazzCash: Sandbox Mode`);
});
