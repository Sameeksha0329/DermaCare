import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Box, Grid, Button, Typography, Paper, Container, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CheckupCard = () => {
  const { username } = useContext(AuthContext);
  const theme = useTheme();

  // Define enhanced gradient colors for a more vibrant look
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

  const scrollToProcedure = () => {
    const procedureSection = document.querySelector(".procedure-section");
    if (procedureSection) {
      procedureSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: '20px',
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
          mt: 2,
        }}
        className="section-container"
      >
        {/* Enhanced floating decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '0%',
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
            bottom: '5%',
            right: '5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradients.secondary.main}30 0%, ${gradients.secondary.main}00 70%)`,
            zIndex: -1,
            animation: 'float 15s infinite ease-in-out alternate-reverse',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '30%',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradients.accent1}20 0%, ${gradients.accent1}00 70%)`,
            zIndex: -1,
            animation: 'float 18s infinite ease-in-out alternate',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
          <Box
                sx={{ 
                  mb: 4,
                  position: 'relative',
                  zIndex: 2,
                  borderRadius: '24px',
                }}
                className="glass-effect"
              >
                <Box 
            sx={{
                    p: 4, 
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${gradients.primary.main}05 0%, ${gradients.primary.light}10 100%)`,
                      zIndex: -1,
                    }
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    sx={{ 
                      position: 'relative',
                      background: `linear-gradient(90deg, ${gradients.primary.main}, ${gradients.accent1})`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
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
                    className="slide-in-left"
                  >
                    Hi, {username}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.05rem' }}
                    className="slide-in-left delay-100"
                  >
              Welcome to DermaCare, your one-stop solution for all skin
              diseases. We use the latest AI technologies to detect skin
              diseases and provide the best suggestions for curing them. Whether
              you have a specific skin concern or just want to ensure your
              skin's health, DermaCare is here to help. Start your checkup now
              and take the first step towards healthier skin.
                  </Typography>

                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="600"
                    sx={{ 
                      mt: 4, 
                      mb: 2,
                      color: gradients.primary.main,
                    }}
                    className="slide-in-left delay-200"
                  >
                    Why choose DermaCare?
                  </Typography>

                  <List className="slide-in-left delay-300">
                    <ListItem sx={{ p: 0, mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <CheckCircleOutlineIcon sx={{ color: gradients.secondary.main, fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Accurate and quick diagnosis of skin conditions" 
                        primaryTypographyProps={{ 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ p: 0, mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <CheckCircleOutlineIcon sx={{ color: gradients.secondary.main, fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Personalized treatment plans tailored to your needs" 
                        primaryTypographyProps={{ 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                    <ListItem sx={{ p: 0, mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <CheckCircleOutlineIcon sx={{ color: gradients.secondary.main, fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="State-of-the-art AI technology and machine learning algorithms" 
                        primaryTypographyProps={{ 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                  </List>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mt: 4,
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      gap: 2,
                    }}
                    className="slide-in-left delay-400"
                  >
                    <Button
                      variant="text"
                      onClick={scrollToProcedure}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: gradients.primary.main,
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: `${gradients.primary.main}15`,
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        py: 1.5,
                      }}
                      className="hover-shine"
            >
              How to Upload
                    </Button>

            <Button
              variant="contained"
              component={Link}
              to="/image"
                      size="large"
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: '30px',
                        background: `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`,
                        boxShadow: `0 10px 20px ${gradients.primary.main}40`,
                        color: 'white',
                        fontWeight: 600,
                        position: 'relative',
                        overflow: 'hidden',
                        fontSize: '1rem',
                        '&:hover': {
                          background: `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`,
                          boxShadow: `0 15px 30px ${gradients.primary.main}60`,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: -100,
                          width: '50px',
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.3)',
                          transform: 'skewX(-15deg)',
                          animation: 'shine 3s infinite',
                        }
                      }}
                      className="pulse"
            >
              Get Your Checkup
            </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative',
                  ml: { md: 10 },  // Add left margin on medium and larger screens
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ width: '80%' }}  // Make motion div take full width
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: '700px', // Increased from 480px
                      height: 'auto',
                      display: { xs: 'none', md: 'block' },
                      position: 'relative',
                      mx: 'auto', // Center horizontally
                      transform: 'scale(1.2)', // Scale up the illustration
                      transformOrigin: 'center center',
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
                    <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="doctorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={gradients.primary.main} stopOpacity="0.2" />
                          <stop offset="100%" stopColor={gradients.primary.main} stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={gradients.primary.main} />
                          <stop offset="100%" stopColor={gradients.primary.accent} />
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
                          <rect x="220" y="170" width="170" height="120" rx="5" />
                        </clipPath>
                      </defs>
                      
                      {/* Background elements */}
                      <rect width="500" height="400" fill="transparent" />
                      <circle cx="400" cy="100" r="50" fill={`${gradients.primary.main}15`} />
                      <circle cx="100" cy="300" r="40" fill={`${gradients.primary.main}15`} />
                      <path d="M0,200 Q125,160 250,200 Q375,240 500,200 L500,400 L0,400 Z" fill="url(#doctorGradient)" />
                      
                      {/* Doctor figure with more details */}
                      <g transform="translate(330, 180) scale(0.8)">
                        {/* Lab coat */}
                        <path d="M60,140 Q60,180 100,180 L150,180 Q190,180 190,140 L190,80 Q190,40 150,40 L100,40 Q60,40 60,80 Z" fill="#f8f9fa" stroke="#e6e6e6" strokeWidth="2" />
                        <path d="M90,50 V170 M160,50 V170" stroke="#f0f0f0" strokeWidth="3" />
                        
                        {/* Head with more details */}
                        <circle cx="125" cy="70" r="30" fill="#FDFDFD" stroke="#e6e6e6" strokeWidth="1" />
                        <path d="M105,65 Q125,80 145,65" fill="none" stroke={gradients.primary.main} strokeWidth="1.5" />
                        <circle cx="115" cy="60" r="3" fill={gradients.primary.main} />
                        <circle cx="135" cy="60" r="3" fill={gradients.primary.main} />
                        <path d="M115,45 Q125,35 135,45" fill="none" stroke={gradients.primary.main} strokeWidth="1.5" />
                        
                        {/* Stethoscope */}
                        <path d="M95,115 Q80,130 95,145 Q110,160 125,145" fill="none" stroke={gradients.secondary.main} strokeWidth="3" />
                        <circle cx="95" cy="145" r="5" fill={gradients.primary.main} />
                        
                        {/* Collar and pocket */}
                        <path d="M105,100 L125,120 L145,100" fill="none" stroke="#e6e6e6" strokeWidth="2" />
                        <rect x="120" y="130" width="20" height="25" rx="2" stroke="#e6e6e6" strokeWidth="1" fill="none" />
                        
                        {/* Arms and legs with more detail */}
                        <path d="M100,180 L90,240 Q90,250 100,250 L110,250 L110,270 L140,270 L140,250 L150,250 Q160,250 160,240 L150,180" fill="#f8f9fa" stroke="#e6e6e6" strokeWidth="2" />
                        <path d="M100,180 Q110,200 150,180" fill="none" stroke="#e6e6e6" strokeWidth="2" />
                        
                        {/* Doctor badge */}
                        <rect x="130" y="140" width="15" height="20" rx="2" fill={gradients.primary.main} />
                        <rect x="132" y="142" width="11" height="7" rx="1" fill="white" />
                        <circle cx="137.5" cy="152" r="4" fill="white" />
                      </g>
                      
                      {/* Patient figure with more details */}
                      <g transform="translate(120, 230) scale(0.7)">
                        {/* Body */}
                        <path d="M60,140 Q60,180 100,180 L150,180 Q190,180 190,140 L190,80 Q190,40 150,40 L100,40 Q60,40 60,80 Z" fill="#f0f0f0" stroke="#e6e6e6" strokeWidth="2" />
                        
                        {/* Head with facial features */}
                        <circle cx="125" cy="70" r="30" fill="#FDFDFD" stroke="#e6e6e6" strokeWidth="1" />
                        <path d="M115,75 Q125,85 135,75" fill="none" stroke={gradients.primary.main} strokeWidth="1.5" />
                        <circle cx="115" cy="65" r="3" fill={gradients.primary.main} />
                        <circle cx="135" cy="65" r="3" fill={gradients.primary.main} />
                        
                        {/* Skin condition visualization */}
                        <circle cx="145" cy="80" r="5" fill={gradients.accent1} stroke={gradients.primary.main} strokeWidth="1" />
                        <circle cx="140" cy="90" r="3" fill={gradients.accent1} stroke={gradients.primary.main} strokeWidth="1" />
                        <circle cx="150" cy="85" r="2" fill={gradients.accent1} stroke={gradients.primary.main} strokeWidth="1" />
                        
                        {/* Limbs */}
                        <path d="M100,180 L90,230 L110,230 L110,270 L140,270 L140,230 L160,230 L150,180" fill="#f0f0f0" stroke="#e6e6e6" strokeWidth="2" />
                        <path d="M100,180 Q125,190 150,180" fill="none" stroke="#e6e6e6" strokeWidth="1.5" />
                        
                        {/* Raised arm for scan */}
                        <path d="M180,120 Q190,90 170,70" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                        <circle cx="170" cy="70" r="8" fill="#f0f0f0" stroke="#e6e6e6" strokeWidth="2" />
                      </g>
                      
                      {/* Modern skin scan device */}
                      <g>
                        {/* Device body */}
                        <rect x="210" y="160" width="190" height="140" rx="10" fill="url(#deviceGradient)" filter="url(#glow)" />
                        <rect x="220" y="170" width="170" height="120" rx="5" fill="url(#screenGradient)" />
                        
                        {/* Screen content */}
                        <g clipPath="url(#screenClip)">
                          {/* Skin analysis interface */}
                          <rect x="220" y="170" width="170" height="30" fill={gradients.primary.main} />
                          <text x="305" y="190" fill="white" fontSize="12" textAnchor="middle" fontFamily="Arial">DERMACARE SKIN ANALYSIS</text>
                          
                          {/* Skin scan visualization */}
                          <rect x="230" y="210" width="70" height="70" rx="3" fill="#f0f0f0" stroke={gradients.primary.main} strokeWidth="1" />
                          <circle cx="250" cy="230" r="5" fill={gradients.accent1} opacity="0.7" />
                          <circle cx="270" cy="240" r="8" fill={gradients.accent1} opacity="0.7" />
                          <circle cx="255" cy="255" r="6" fill={gradients.accent1} opacity="0.7" />
                          <path d="M240,245 Q260,235 280,255" fill="none" stroke={gradients.primary.main} strokeWidth="1" strokeDasharray="2" />
                          
                          {/* Analysis results */}
                          <rect x="310" y="210" width="70" height="15" rx="2" fill="#f0f0f0" />
                          <rect x="310" y="230" width="70" height="15" rx="2" fill="#f0f0f0" />
                          <rect x="310" y="250" width="70" height="15" rx="2" fill="#f0f0f0" />
                          <rect x="310" y="270" width="40" height="10" rx="5" fill={gradients.secondary.main} />
                          
                          {/* Scan animation */}
                          <line x1="230" y1="260" x2="300" y2="260" stroke={gradients.secondary.main} strokeWidth="1" opacity="0.5">
                            <animate attributeName="y1" values="210;280;210" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="210;280;210" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                          </line>
                        </g>
                        
                        {/* Device buttons and details */}
                        <circle cx="305" cy="305" r="8" fill="white" stroke={gradients.primary.main} strokeWidth="1" />
                        <rect x="270" y="305" width="20" height="3" rx="1" fill="white" />
                        <rect x="320" y="305" width="20" height="3" rx="1" fill="white" />
                      </g>
                      
                      {/* Skin cells floating icons */}
                      <g transform="translate(180, 130) scale(0.6)" opacity="0.9">
                        <circle cx="40" cy="40" r="35" fill="#f8f9fa" stroke={gradients.primary.main} strokeWidth="3" />
                        <circle cx="40" cy="40" r="15" fill={gradients.accent1} />
                        <path d="M40,10 A30,30 0 0,1 70,40" stroke={gradients.primary.main} strokeWidth="3" fill="none" />
                        <path d="M40,70 A30,30 0 0,1 10,40" stroke={gradients.primary.main} strokeWidth="3" fill="none" />
                        <animateTransform 
                          attributeName="transform" 
                          type="translate" 
                          from="0,0" 
                          to="0,-10" 
                          dur="3s" 
                          repeatCount="indefinite" 
                          additive="sum" />
                      </g>
                      
                      {/* Floating dermatology icon */}
                      <g transform="translate(400, 110) scale(0.5)" opacity="0.9">
                        <rect x="10" y="10" width="60" height="80" rx="5" fill="#f8f9fa" stroke={gradients.primary.main} strokeWidth="3" />
                        <circle cx="40" cy="35" r="15" fill={gradients.accent1} opacity="0.5" />
                        <path d="M20,60 L60,60 M20,75 L50,75" stroke={gradients.primary.main} strokeWidth="3" strokeLinecap="round" />
                        <animateTransform 
                          attributeName="transform" 
                          type="translate" 
                          from="0,0" 
                          to="0,-10" 
                          dur="2.5s" 
                          repeatCount="indefinite" 
                          additive="sum" />
                      </g>
                      
                      {/* DermaCare text */}
                      <text x="250" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill={gradients.primary.main}>DermaCare</text>
                      <text x="250" y="65" textAnchor="middle" fontSize="14" fill={gradients.secondary.main}>Advanced Skin Analysis</text>
                      
                      {/* Extra floating elements */}
                      <g transform="translate(350, 300) scale(0.6)" opacity="0.7">
                        <circle cx="0" cy="0" r="25" fill={gradients.accent2} fillOpacity="0.3" />
                        <path d="M-15,-15 L15,15 M-15,15 L15,-15" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        <animateTransform 
                          attributeName="transform" 
                          type="rotate" 
                          from="0 0 0" 
                          to="360 0 0" 
                          dur="15s" 
                          repeatCount="indefinite" 
                          additive="sum" />
                      </g>
                    </svg>
                  </Box>
                </motion.div>
          </Box>
            </Grid>
      </Grid>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default CheckupCard;
