const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
});

// Test token route (for debugging)
router.get('/test-auth', authMiddleware, (req, res) => {
    console.log("Decoded user:", req.user);
    return res.json({ message: 'Token valid', user: req.user });
});


module.exports = router;
