import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid or expired token',
            error: error.message 
        });
    }
};

export default authenticate;
