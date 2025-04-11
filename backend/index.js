require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { default: serverless } = require('serverless-http');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Static Files
app.use('/images', express.static('uploads'));

// Import Routes
const skill_routes = require('../routes/skill_route');
const about_routes = require('../routes/about_route');
const education_routes = require('../routes/education_route');
const experience_routes = require('../routes/experience_route');
const project_routes = require('../routes/project_routes');

// Use Routes
app.use('/api', project_routes);
app.use('/api', skill_routes);
app.use('/api', about_routes);
app.use('/api', education_routes);
app.use('/api', experience_routes);

// Export as serverless function (🚀 Fix for Vercel)
module.exports = app;
module.exports.handler = serverless(app);
