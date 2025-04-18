const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Specify your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
  credentials: true, // Allow credentials (e.g., cookies or tokens) to be sent
};

app.use(cors(corsOptions));


app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
// Use auth routes
app.use('/api', authRoutes);

// Handle preflight OPTIONS request


// Connect DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
