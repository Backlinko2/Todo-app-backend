const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.header('Authorization');
    

    if (!token) return res.status(401).json({ message: 'No token provided' });

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
        
        req.user = decoded.id;
        next(); // IMPORTANT
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
