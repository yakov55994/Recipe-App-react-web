import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

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
        console.error("❌ Authentication error:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'jwt expired', message: 'Token has expired, please log in again' });
        }

        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;
