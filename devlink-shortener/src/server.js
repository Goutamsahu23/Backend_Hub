import express from 'express';
import dontenv from 'dotenv';
import connectDB from './config/db.js';

dontenv.config();

// connect to the database
connectDB();

// app initialization
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));