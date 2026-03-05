const jwt = require('jsonwebtoken');

const JWT_SECRET = 'flipkart_clone_secret_key_2024';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required! Please log in.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token!'
        });
    }
};

module.exports = authenticate;