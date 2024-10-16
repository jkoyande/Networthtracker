// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const validateToken = (request, h) => {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        return h.response({ message: 'No token provided' }).code(403).takeover();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
    } catch (err) {
        return h.response({ message: 'Invalid token' }).code(403).takeover();
    }

    return h.continue;
};

module.exports = { validateToken };
