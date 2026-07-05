require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const seedAdmin = require('./seed/seedAdmin');

const app = express();
const PORT = process.env.PORT || 5000;

// Normalize allowed origins from env and remove trailing slash if present
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
.split(',')
.map((o) => o.trim().replace(/\/$/, ''))
.filter(Boolean);

console.log('ALLOWED_ORIGINS from env:', process.env.ALLOWED_ORIGINS);
console.log('Normalized allowedOrigins:', allowedOrigins);

app.use(cors({
origin: function (origin, callback) {
// Allow requests without origin (Postman, curl, server-to-server)
if (!origin) return callback(null, true);

const normalizedOrigin = origin.trim().replace(/\/$/, '');

if (allowedOrigins.length === 0 || allowedOrigins.includes(normalizedOrigin)) {
  return callback(null, true);
}

console.log('❌ CORS blocked for origin:', origin);
console.log('✅ Allowed origins:', allowedOrigins);

return callback(new Error(`CORS blocked for origin: ${origin}`));

},
credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
console.log('✅ MongoDB connected');
await seedAdmin();
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Static Files
app.use('/images', express.static('uploads'));

// Import Routes
const auth_routes = require('./routes/auth_route');
const skill_routes = require('./routes/skill_route');
const about_routes = require('./routes/about_route');
const education_routes = require('./routes/education_route');
const experience_routes = require('./routes/experience_route');
const project_routes = require('./routes/project_routes');

// Use Routes
app.use('/api', auth_routes);
app.use('/api', project_routes);
app.use('/api', skill_routes);
app.use('/api', about_routes);
app.use('/api', education_routes);
app.use('/api', experience_routes);

// Health route
app.get('/', (req, res) => {
res.send('Portfolio backend is running');
});

// Start server
app.listen(PORT, () => {
console.log(`🚀 Backend running on port ${PORT}`);
});

module.exports = app;
