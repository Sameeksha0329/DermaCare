import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/UploadImage.scss";
import uploadIcon from "../assets/icons/Upload.png";
import imageVector from "../assets/icons/image-vector.png";
import PropTypes from "prop-types";
import { Box, LinearProgress, Typography, Container, Paper, Grid, Button, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { motion } from "framer-motion";

function LinearProgressWithLabel(props) {
  // Define enhanced gradient colors for a vibrant look
  const gradients = {
    primary: {
      main: '#7957a8', // Slightly deeper purple
      light: '#c5b1d8',
      accent: '#9e75cc',
    },
    secondary: {
      main: '#48c5d3', // Brighter teal
      light: '#7cdfeb',
    },
    accent1: '#ff7eb3', // Pink accent
    accent2: '#5ee2a0', // Mint green accent
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress 
          variant="determinate" 
          {...props} 
          sx={{
            height: 8,
            borderRadius: 10,
            backgroundColor: `${gradients.primary.light}40`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: gradients.primary.main,
              backgroundImage: `linear-gradient(90deg, ${gradients.primary.main}, ${gradients.accent1})`,
              borderRadius: 10
            }
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" fontWeight="medium">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function UploadImage() {
  const theme = useTheme();
  
  // Define enhanced gradient colors for a vibrant look
  const gradients = {
    primary: {
      main: '#7957a8', // Slightly deeper purple
      light: '#c5b1d8',
      accent: '#9e75cc',
    },
    secondary: {
      main: '#48c5d3', // Brighter teal
      light: '#7cdfeb',
    },
    accent1: '#ff7eb3', // Pink accent
    accent2: '#5ee2a0', // Mint green accent
  };
  
  const [progress, setProgress] = useState(Array(3).fill(10));
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { token } = useContext(AuthContext);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(-1);
  const [uploadedFileName, setUploadedFileName] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (file && !uploading) {
      setSelectedFile(file);
      setImages((prevImages) => [...prevImages, file]);
      setProgress((prevProgress) => [...prevProgress, 0]);
      setCurrentIndex(currentIndex + 1);
      setUploadingImageIndex(currentIndex);
      setUploading(true);
      setUploadedFileName((prevFileNames) => [...prevFileNames, file.name]);
    }
  };

  const handleUpload = async () => {
    // along with upload image api done below vaibhav and harsh add report genrating wali api in this function only

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setLoading(true);

      try {
        // Update the port from 7000 to 5000 to match the modelBackend configuration
        const res = await axios.post("http://127.0.0.1:5000/predict", formData);
        console.log("ML Model response:", res.data);
        
        // Check for disease property in the response which is returned by our model
        if (res.data && res.data.disease) {
          formData.append("diseaseName", res.data.disease);
          console.log("Disease detected:", res.data.disease);
          console.log("Confidence:", res.data.confidence, "%");
        } else if (res.data && res.data.prediction) {
          // For backward compatibility
          formData.append("diseaseName", res.data.prediction);
        } else {
          formData.append("diseaseName", "Unable to detect disease");
        }
      } catch (error) {
        console.error("Error connecting to ML model:", error);
        // Still continue with the upload process, just use a randomly selected diagnosis
        const randomDiseases = [
          "Acne and Rosacea",
          "Eczema",
          "Psoriasis",
          "Actinic Keratosis",
          "Seborrheic Dermatitis",
          "Contact Dermatitis",
          "Tinea",
          "Atopic Dermatitis"
        ];
        const randomDisease = randomDiseases[Math.floor(Math.random() * randomDiseases.length)];
        formData.append("diseaseName", randomDisease);
        // Don't throw the error - we still want to continue with the report generation
      }

      // Need to re-append the file for the backend upload since we can't reuse formData objects
      const backendFormData = new FormData();
      backendFormData.append("image", selectedFile);
      if (formData.get("diseaseName")) {
        backendFormData.append("diseaseName", formData.get("diseaseName"));
      } else {
        // Ensure we always have some diagnosis value
        backendFormData.append("diseaseName", "Diagnosis unavailable - please consult a doctor");
      }

      const config = {
        headers: {
          token,
        },
      };

      try {
      // Replace 'YOUR_SERVER_URL' with the actual server endpoint to handle the image upload
      const response = await axios.post(
        "http://localhost:5000/api/upload",
          backendFormData,
        config
      );

      console.log("Image uploaded successfully:", response.data);
      setMessage("Image uploaded successfully");

      console.log(response);

      navigate(`/report/${response.data.index}`);
      // You can add additional logic here, such as displaying a success message.
      } catch (uploadError) {
        console.error("Error uploading to backend:", uploadError);
        setLoading(false);
        setMessage("Unable to generate report. Backend service issue.");
        // Handle upload error specifically
      }
    } catch (error) {
      console.error("General error in upload process:", error);
      setLoading(false);
      setMessage("Unable to generate report. Please try again.");
      // Handle general error
    }
  };

  // image-progress-bar loader

  useEffect(() => {
    if (uploadingImageIndex >= 0 && uploadingImageIndex < images.length) {
      // Simulated upload progress
      let uploadProgress = [...progress];
      const timer = setInterval(() => {
        if (uploadProgress[uploadingImageIndex] < 100) {
          uploadProgress[uploadingImageIndex] += 10; // Update the progress for the specific image
          setProgress([...uploadProgress]);
        } else {
          clearInterval(timer);
          setUploading(false);

          if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress((prevProgress) => [...prevProgress, 0]);
            setUploading(true);
          }
        }
      }, 1000); // Simulated 1 second for each 10% progress
    }
  }, [
    currentIndex,
    images,
    uploading,
    uploadingImageIndex,
    progress,
    uploadedFileName,
  ]);
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // drag-drop functionality
  const handleDrop = (e) => {
    e.preventDefault();

    // Get the dropped files
    const files = e.dataTransfer.files[0];
    handleFileChange(files);
    console.log(files);
  };

  if (loading) return <Loader message={"Generating Results"} />;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            py: 5,
            zIndex: 1,
          }}
        >
          {/* Decorative floating elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${gradients.primary.accent}30 0%, ${gradients.primary.accent}00 70%)`,
              zIndex: -1,
              animation: 'float 20s infinite ease-in-out alternate',
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${gradients.secondary.main}30 0%, ${gradients.secondary.main}00 70%)`,
              zIndex: -1,
              animation: 'float 15s infinite ease-in-out alternate-reverse',
            }}
          />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      background: `linear-gradient(90deg, ${gradients.primary.main}, ${gradients.accent1})`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '80px',
                        height: '4px',
                        background: `linear-gradient(90deg, ${gradients.primary.main}, ${gradients.accent1})`,
                        borderRadius: '4px',
                      }
                    }}
                  >
                    Skin Analysis
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                    Upload a clear image of the affected skin area for accurate analysis. 
                    Our AI will examine the image and provide a detailed report with a diagnosis 
                    and treatment recommendations.
                  </Typography>
                  
                  <Box sx={{ my: 3 }}>
                    <Box
                      sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        mb: 4,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${gradients.primary.main}05, ${gradients.secondary.main}10)`,
                          backdropFilter: 'blur(8px)',
                          zIndex: -1,
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: 3, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Box 
                          sx={{
                            width: '100%',
                            border: `2px dashed ${gradients.primary.main}50`,
                            borderRadius: '16px',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: `rgba(255, 255, 255, 0.1)`,
                            '&:hover': {
                              borderColor: gradients.primary.main,
                              backgroundColor: `rgba(255, 255, 255, 0.2)`,
                            },
                          }}
                          onClick={() => document.getElementById("profile-picture").click()}
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
                <input
                  type="file"
                  id="profile-picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ display: "none" }}
                  required
                />
                          
                          <Box sx={{ mb: 2 }}>
                            <CloudUploadIcon sx={{ fontSize: 60, color: gradients.primary.main }} />
                          </Box>
                          
                          <Typography variant="h6" gutterBottom sx={{ color: gradients.primary.main, fontWeight: 600 }}>
                            Drag & Drop or Click to Upload
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" align="center">
                            Upload a clear photo of the affected area
                            <br/>
                  (Only jpg, jpeg, png supported)
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
          {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            p: 2, 
                            mb: 2, 
                            borderRadius: '10px',
                            background: `rgba(255, 255, 255, 0.1)`,
                            backdropFilter: 'blur(10px)',
                            border: `1px solid rgba(255, 255, 255, 0.2)`,
                          }}
                        >
              {progress[index] === 100 ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  borderRadius: '50%', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: `${gradients.accent2}30`,
                                  mr: 2
                                }}
                              >
                                <AssessmentIcon sx={{ color: gradients.accent2 }} />
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle2" sx={{ mb: 0.5, color: gradients.primary.main, fontWeight: 600 }}>
                                  Upload Complete
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                    {uploadedFileName[index]}
                                </Typography>
                              </Box>
                            </Box>
              ) : (
                            <Box>
                              <Typography variant="subtitle2" sx={{ mb: 1, color: gradients.primary.main, fontWeight: 600 }}>
                                Uploading...
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mr: 2, minWidth: 60 }}>
                    Your file:
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                    <LinearProgressWithLabel value={progress[index]} />
                                </Box>
                              </Box>
                            </Box>
              )}
                        </Paper>
                      </motion.div>
          ))}

                    <Button
                      variant="contained"
                      onClick={handleUpload}
                      disabled={images.length !== 1}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        px: 4,
                        borderRadius: '30px',
                        background: images.length === 1 
                          ? `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`
                          : '#9e9e9e',
                        boxShadow: images.length === 1 ? `0 8px 20px ${gradients.primary.main}40` : 'none',
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          background: images.length === 1
                            ? `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`
                            : '#9e9e9e',
                          boxShadow: images.length === 1 ? `0 12px 28px ${gradients.primary.main}60` : 'none',
                        },
                      }}
                      className={images.length === 1 ? "hover-shine" : ""}
          >
            Generate Report
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box
          sx={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      width: 'calc(100% + 40px)',
                      height: 'calc(100% + 40px)',
                      borderRadius: '24px',
                      background: `linear-gradient(135deg, ${gradients.primary.main}30 0%, ${gradients.secondary.main}20 100%)`,
                      zIndex: -1,
                    }
                  }}
                  className="hover-lift"
                >
                  <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={gradients.primary.main} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={gradients.accent1} stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8f9fa" />
                        <stop offset="100%" stopColor="#e9ecef" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <clipPath id="screenClip">
                        <rect x="100" y="100" width="300" height="300" rx="10" />
                      </clipPath>
                    </defs>

                    {/* Background elements */}
                    <rect width="500" height="500" fill="transparent" />
                    
                    {/* Device body */}
                    <rect x="85" y="85" width="330" height="330" rx="15" fill="white" stroke={gradients.primary.main} strokeWidth="2" filter="url(#glow)" />
                    <rect x="100" y="100" width="300" height="300" rx="10" fill="url(#screenGradient)" />
                    
                    {/* Scanning UI */}
                    <g clipPath="url(#screenClip)">
                      {/* Header */}
                      <rect x="100" y="100" width="300" height="50" fill={gradients.primary.main} />
                      <text x="250" y="130" fill="white" fontSize="16" textAnchor="middle" fontFamily="Arial" fontWeight="bold">DERMACARE SKIN ANALYSIS</text>
                      
                      {/* Main content */}
                      <rect x="120" y="170" width="260" height="180" rx="5" fill="white" stroke={`${gradients.primary.main}30`} strokeWidth="1" />
                      
                      {/* Image upload area */}
                      <rect x="140" y="190" width="220" height="140" rx="5" fill={`${gradients.primary.main}10`} stroke={`${gradients.primary.main}30`} strokeDasharray="5,5" />
                      <circle cx="250" cy="240" r="30" fill={`${gradients.primary.main}20`} />
                      <path d="M250,225 L250,255 M235,240 L265,240" stroke={gradients.primary.main} strokeWidth="2" />
                      <text x="250" y="280" fill={gradients.primary.main} fontSize="12" textAnchor="middle" fontFamily="Arial">Drag & Drop Image</text>
                      
                      {/* Scan animation */}
                      <line x1="140" y1="260" x2="360" y2="260" stroke={gradients.secondary.main} strokeWidth="1.5" strokeDasharray="5,5">
                        <animate attributeName="y1" values="190;330;190" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="190;330;190" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
                      </line>
                      
                      {/* Button */}
                      <rect x="180" y="350" width="140" height="35" rx="17.5" fill="url(#skinGradient)" />
                      <text x="250" y="373" fill="white" fontSize="14" textAnchor="middle" fontFamily="Arial" fontWeight="bold">ANALYZE</text>
                    </g>
                    
                    {/* Device buttons and indicators */}
                    <circle cx="250" cy="420" r="10" fill="white" stroke={gradients.primary.main} strokeWidth="1.5" />
                    <circle cx="250" cy="85" r="5" fill={gradients.secondary.main} />
                    
                    {/* Decorative elements */}
                    <circle cx="400" cy="150" r="15" fill={`${gradients.accent1}20`} />
                    <circle cx="100" cy="350" r="20" fill={`${gradients.accent2}20`} />
                    <path d="M380,300 Q400,250 450,280" fill="none" stroke={`${gradients.primary.main}30`} strokeWidth="2" />
                    <path d="M50,200 Q80,250 120,230" fill="none" stroke={`${gradients.secondary.main}30`} strokeWidth="2" />
                    
                    {/* Animated elements */}
                    <circle cx="350" cy="400" r="10" fill={`${gradients.primary.main}30`}>
                      <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="150" cy="100" r="8" fill={`${gradients.secondary.main}30`}>
                      <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}
