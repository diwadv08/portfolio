const bcrypt = require('bcryptjs');
const Admin_model = require('../models/admin');

// Ensures exactly one admin account exists, created from environment
// variables the first time the server boots against a fresh database.
// Safe to run on every startup — it no-ops once an admin already exists.
async function seedAdmin() {
    try {
        const existing = await Admin_model.countDocuments({});
        if (existing > 0) return;

        const username = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            console.warn('⚠️  No ADMIN_PASSWORD set in .env — skipping admin seed. Set ADMIN_USERNAME & ADMIN_PASSWORD in your .env file and restart the server.');
            return;
        }

        const hashed = await bcrypt.hash(password, 10);
        await Admin_model.create({ username, password: hashed });
        console.log(`✅ Admin account created for username "${username}". You can now log in from the admin panel.`);
    } catch (err) {
        console.error('❌ Failed to seed admin account:', err.message);
    }
}

module.exports = seedAdmin;
