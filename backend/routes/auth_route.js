const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin_model = require('../models/admin');
const verifyAdmin = require('../middleware/auth');

const COOKIE_NAME = 'session';
const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
    httpOnly: true,               // not readable by client-side JS -> mitigates XSS token theft
    secure: isProd,                // only sent over HTTPS in production
    sameSite: isProd ? 'none' : 'lax', // 'none' needed for cross-site (Vercel/Render) deployments
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
    path: '/',
};

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const admin = await Admin_model.findOne({ username: username.trim().toLowerCase() });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie(COOKIE_NAME, token, cookieOptions);
        res.status(200).json({ message: 'Login successful', username: admin.username });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// POST /api/logout
router.post('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
});

// GET /api/verify -> used by the admin app on load / refresh to check session validity
router.get('/verify', verifyAdmin, (req, res) => {
    res.status(200).json({ authenticated: true, username: req.admin.username });
});

module.exports = router;
