require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// 🔧 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://todo-app-omega-gules-54.vercel.app", // Use env or fallback
  credentials: true
}));

// ✅ Import your routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



app.get('/', (req , res) => {
    res.send("backend is running!!")
})


// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
