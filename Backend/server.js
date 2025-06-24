import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary"; // Import Cloudinary
import { loginUser } from "./Routes/login.js";
import { uploadImage } from "./Routes/upload.js";
import { checkAuth } from "./Middleware/Authentication.js";
import { diagnosis } from "./Routes/diagnoses.js";
import { getProfile } from "./Routes/profile.js";
import { imageHistory } from "./Routes/imageHistory.js";
import { searchDisease } from "./Routes/searchDisease.js";
import { logout } from "./Routes/logout.js";
import { generatePdf } from "./Routes/generatePdf.js";
import { registerUser } from "./Routes/registration.js";
import { chatbotMessage } from "./Routes/chatbot.js";
import connectToMongoDB from "./DB/Mongo_Connection.js";
import { teams } from "./Routes/teams.js";

const app = express();
const port = 5000; // Hardcoded for testing

const reactServerURL = `${process.env.REACT_SERVER_URL}`; // Replace with your actual React server URL

// For development, allowing all origins
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  })
);

// Middleware for parsing JSON data
app.use(bodyParser.json());
// Use cookie-parser middleware
app.use(cookieParser());

//conecting to MongoDB
connectToMongoDB();

// Cloudinary configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage });
// Send a welcome email to the user
app.post("/api/register", upload.single("profilePicture"), registerUser);

// User Login API with JWT token and cookie
app.post("/api/login",loginUser);

// Update the /api/upload endpoint
app.post("/api/upload", checkAuth, upload.single("image"), uploadImage);

app.post("/api/diagnose", checkAuth, diagnosis);

// User Profile API
app.get("/api/user/profile", checkAuth, getProfile);

// Image History API
app.get("/api/user/images", checkAuth, imageHistory);

// Search Any disease
app.get("/api/search-disease", searchDisease);

// Logout API
app.post("/api/logout", logout);

// Endpoint to generate a PDF containing user diagnosis and send it to the user's Gmail
app.get("/api/generate-pdf", checkAuth,generatePdf);

// AI Chatbot endpoint - can reference a specific diagnosis
app.post("/api/chatbot", checkAuth, chatbotMessage);

// Simple chatbot endpoint that doesn't require authentication
app.post("/api/simple-chatbot", (req, res) => {
  console.log("Simple chatbot endpoint called");
  console.log("Request body:", req.body);
  
  const { message } = req.body;
  
  let response = "I'm sorry, I don't understand. Please try a different question.";
  
  // Simple keyword matching for testing
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    response = "Hello! How can I help you with your skin concerns today?";
  } else if (message.toLowerCase().includes("acne")) {
    response = "Acne is a common skin condition characterized by pimples, blackheads, and whiteheads. It's often treated with topical medications containing benzoyl peroxide or salicylic acid.";
  } else if (message.toLowerCase().includes("eczema")) {
    response = "Eczema is a condition that causes dry, itchy, and inflamed skin. It's often managed with moisturizers, topical corticosteroids, and avoiding triggers.";
  } else if (message.toLowerCase().includes("psoriasis")) {
    response = "Psoriasis is an autoimmune condition that causes scaly, red patches on the skin. Treatment options include topical treatments, phototherapy, and systemic medications.";
  } else if (message.toLowerCase().includes("thank")) {
    response = "You're welcome! Feel free to ask if you have any other questions about skin conditions.";
  }
  
  return res.json({ response });
});

// Test endpoint for debugging
app.post("/api/test-chatbot", (req, res) => {
  console.log("Test chatbot endpoint called");
  console.log("Request body:", req.body);
  return res.json({ response: "This is a test response from the server" });
});

//teams api
app.get("/api/team", teams);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});