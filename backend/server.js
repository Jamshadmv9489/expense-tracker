import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'

// Load environment variables from .env file (like PORT, Mongo URI)
dotenv.config();

// Connect to the MongoDB database
connectDB();

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware: Allows the server to understand JSON data sent in a request body
app.use(express.json());

app.use(cookieParser());

// Middleware: Logs every request to the console (shows method, URL, and status)
app.use(morgan('dev'));

// Routes
app.use("/auth", authRoutes);

// Simple route to check if the API is working
app.get("/", (req, res) => {
  res.send("API running...");
});

// Set the port from environment variables or use 5000 as a default
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);