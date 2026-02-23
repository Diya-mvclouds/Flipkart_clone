const jwt = require('jsonwebtoken');

const JWT_SECRET = 'flipkart_clone_secret_key_2024';

// Middleware to protect routes
const authenticate = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required! Please log in.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add user info to request object
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        
        next(); // Proceed to the next function
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token!'
        });
    }
};

module.exports = authenticate;