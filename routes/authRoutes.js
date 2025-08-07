const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = "your_jwt_secret";

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy check - replace with real DB check
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });

    // ✅ Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // for cross-site cookies (Vercel frontend + Render backend)
      secure: true      // must be true on HTTPS
    });

    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
