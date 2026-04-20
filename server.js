require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const path         = require('path');
const connectDB    = require('./src/config/db');
const cookieParser = require('cookie-parser');

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://paylance-a3hm.onrender.com',
    credentials: true
}));
app.use(cookieParser());

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.use(express.static(path.join(__dirname)));
app.use('/static', express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Paylance Server: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://192.168.0.106:${PORT}`);
    console.log(`💳 JazzCash: Sandbox Mode`);
});