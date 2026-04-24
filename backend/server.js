const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

/* =======================
   CORS CONFIG (SAFE)
======================= */
app.use(cors({
  origin: (origin, callback) => callback(null, true), // Always allow any origin
  credentials: true
}));

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running 🏠' });
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

/* =======================
   START SERVER FIRST (IMPORTANT FOR RENDER)
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* =======================
   CONNECT TO MONGODB
======================= */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
    });
}