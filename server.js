require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// 🔧 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all origins - you can add specific logic here if needed
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
