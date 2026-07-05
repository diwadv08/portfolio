const jwt = require('jsonwebtoken');

// Verifies the httpOnly session cookie set at login.
// Attaches the decoded admin payload to req.admin when valid.
function verifyAdmin(req, res, next) {
    const token = req.cookies ? req.cookies.session : null;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Session expired or invalid. Please log in again.' });
    }
}

module.exports = verifyAdmin;
