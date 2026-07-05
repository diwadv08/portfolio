const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
}, { timestamps: true });

const Admin_model = mongoose.model('Admin', AdminSchema);

module.exports = Admin_model;
