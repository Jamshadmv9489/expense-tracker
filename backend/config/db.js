import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect using the URI stored in your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // If connection fails, show the error message in the console
    console.error(error.message);
    
    // Stop the server (exit the process) if the database cannot connect
    process.exit(1);
  }
};

export default connectDB;