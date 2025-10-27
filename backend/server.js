// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); 

const contactRouter = require('./routes/contactRoute'); 

const app = express();
const port = process.env.PORT || 5000;

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));
// --------------------------


// --- Middleware ---
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['POST'],
}));
app.use(express.json()); 

// --- API Routes ---
app.use('/api/contact', contactRouter);

// --- Server Start ---
module.exports = app;