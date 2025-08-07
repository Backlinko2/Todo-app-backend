const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// 🔧 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://todo-app-omega-gules-54.vercel.app", // Your frontend URL
  credentials: true
}));

// ✅ Import your routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
