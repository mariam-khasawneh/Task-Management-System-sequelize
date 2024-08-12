const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'test'); 

        // Find the user by ID from the token
        const user = await User.findByPk(decoded.id);
        if (!user || user.deleted) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = auth;
