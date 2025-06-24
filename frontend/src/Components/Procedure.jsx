import React from "react";
import { Box, Container, Typography, Grid, Paper, Divider, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import TouchAppIcon from '@mui/icons-material/TouchApp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';

function Procedure() {
  const theme = useTheme();

  const steps = [
    {
      icon: <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Click & Upload",
      description: "Navigate to the upload section through the checkup button from the navbar. Upload a sharp and clear image of the affected part of your skin for our model to give you the best results.",
      delay: 0.1,
      iconBg: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "View your Diagnosis",
      description: "Upon successful upload of an image, click on generate report and wait for the model to show its magic and generate your results.",
      delay: 0.2,
      iconBg: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Access via Email",
      description: "For export purpose lookout for the PDF and email options in the generated report which can be easily downloaded or sent to the registered mail ensuring hassle-free storage and retrieval.",
      delay: 0.3,
      iconBg: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
    }
  ];

  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -30,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: '#ffffff',
          borderRadius: '50% 50% 0 0',
        }
      }}
      id="procedure-section"
      className="procedure-section section-container"
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20 0%, ${theme.palette.secondary.light}00 70%)`,
          zIndex: 0,
          animation: 'pulse 18s infinite ease-in-out alternate',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.light}00 70%)`,
          zIndex: 0,
          animation: 'pulse 15s infinite ease-in-out alternate-reverse',
        }}
      />
      
      {/* Curved path decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: '40%',
          opacity: 0.03,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 300" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 Q250,20 500,100 Q750,180 1000,100 L1000,300 L0,300 Z" 
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Box 
            textAlign="center" 
            mb={6}
            className="glass-effect"
            sx={{
              p: 4,
              borderRadius: '20px',
              maxWidth: '900px',
              mx: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            />
            
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              How <Typography component="span" variant="h3" color="primary" fontWeight="bold">DermaCare</Typography> Works
            </Typography>

            <Divider
              sx={{
                width: '80px',
                mx: 'auto',
                my: 2,
                borderColor: 'primary.main',
                borderWidth: 2,
              }}
            />
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '5px',
                      background: step.iconBg,
                    }
                  }}
                  className="hover-lift hover-shine"
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      background: step.iconBg,
                      boxShadow: `0 10px 20px ${theme.palette.primary.main}40`,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        width: 'calc(100% + 12px)',
                        height: 'calc(100% + 12px)',
                        border: `2px dashed ${theme.palette.primary.light}`,
                        borderRadius: '50%',
                        animation: 'spin 20s linear infinite',
                      }
                    }}
                  >
                    {step.icon}
                  </Box>

                  <Box
                    sx={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    color="primary.dark"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.7 }}
                  >
                    {step.description}
                  </Typography>

                  <Box
                    sx={{
                      width: '100%',
                      height: '180px',
                      mt: 2,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {index === 0 && (
                      <svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f0e6f6" />
                            <stop offset="100%" stopColor="#e1d1eb" />
                          </linearGradient>
                          <filter id="shadow1" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor={theme.palette.primary.main} floodOpacity="0.3"/>
                          </filter>
                        </defs>
                        
                        {/* Background with subtle pattern */}
                        <rect width="300" height="200" fill="url(#uploadGradient)" />
                        <path d="M0,40 Q150,80 300,40 L300,0 L0,0 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        <path d="M0,160 Q150,120 300,160 L300,200 L0,200 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        
                        {/* Phone outline */}
                        <rect x="90" y="30" width="120" height="140" rx="15" fill="#fff" stroke={theme.palette.primary.main} strokeWidth="3" filter="url(#shadow1)" />
                        <rect x="95" y="35" width="110" height="115" rx="10" fill="#f7f7f7" />
                        
                        {/* Camera UI */}
                        <circle cx="150" cy="80" r="40" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        <circle cx="150" cy="80" r="35" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        <circle cx="150" cy="80" r="30" fill="white" stroke={theme.palette.primary.main} strokeWidth="2" />
                        <circle cx="150" cy="80" r="25" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        
                        {/* Camera icon */}
                        <path d="M140,75 h20 v10 h-20 Z" fill={theme.palette.primary.main} fillOpacity="0.7" />
                        <circle cx="150" cy="80" r="5" fill={theme.palette.primary.main} />
                        <circle cx="150" cy="80" r="3" fill="white" />
                        
                        {/* Upload arrow */}
                        <path d="M150,45 v25 M140,55 l10,-10 l10,10" stroke={theme.palette.primary.main} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Skin texture overlay */}
                        <circle cx="135" cy="95" r="7" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        <circle cx="155" cy="60" r="5" fill={theme.palette.primary.main} fillOpacity="0.3" />
                        <circle cx="170" cy="85" r="6" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        
                        {/* Phone button */}
                        <circle cx="150" cy="165" r="10" fill="white" stroke={theme.palette.primary.main} strokeWidth="2" />
                        
                        {/* Text */}
                        <text x="150" y="125" fontFamily="Arial" fontSize="10" fontWeight="bold" fill={theme.palette.primary.dark} textAnchor="middle">CAPTURE SKIN PHOTO</text>
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="reportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f0e6f6" />
                            <stop offset="100%" stopColor="#e1d1eb" />
                          </linearGradient>
                          <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor={theme.palette.primary.main} floodOpacity="0.3"/>
                          </filter>
                        </defs>
                        
                        {/* Background */}
                        <rect width="300" height="200" fill="url(#reportGradient)" />
                        <path d="M0,40 Q150,80 300,40 L300,0 L0,0 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        <path d="M0,160 Q150,120 300,160 L300,200 L0,200 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        
                        {/* Report document */}
                        <rect x="75" y="30" width="150" height="140" rx="5" fill="white" stroke={theme.palette.primary.main} strokeWidth="2" filter="url(#shadow2)" />
                        
                        {/* Header */}
                        <rect x="75" y="30" width="150" height="25" rx="5" fill={theme.palette.primary.main} />
                        <text x="150" y="47" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">DERMACARE ANALYSIS</text>
                        
                        {/* Report content */}
                        <circle cx="100" cy="70" r="12" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        <rect x="120" y="65" width="85" height="10" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        
                        <circle cx="100" cy="95" r="12" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        <rect x="120" y="90" width="85" height="10" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        
                        <circle cx="100" cy="120" r="12" fill={theme.palette.primary.main} fillOpacity="0.2" />
                        <rect x="120" y="115" width="85" height="10" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        
                        {/* Progress bar */}
                        <rect x="90" y="140" width="120" height="10" rx="5" fill="#f0e6f6" />
                        <rect x="90" y="140" width="80" height="10" rx="5" fill={theme.palette.primary.main} />
                        
                        {/* Analysis percentage */}
                        <text x="185" y="150" fontFamily="Arial" fontSize="10" fontWeight="bold" fill={theme.palette.primary.dark} textAnchor="middle">67%</text>
                        
                        {/* Skin image */}
                        <rect x="90" y="95" width="20" height="20" rx="3" fill={theme.palette.primary.main} fillOpacity="0.2" stroke={theme.palette.primary.main} strokeWidth="1" />
                        <circle cx="95" cy="100" r="2" fill={theme.palette.primary.main} fillOpacity="0.4" />
                        <circle cx="105" cy="110" r="3" fill={theme.palette.primary.main} fillOpacity="0.4" />
                        <circle cx="100" cy="105" r="2.5" fill={theme.palette.primary.main} fillOpacity="0.4" />
                        
                        {/* Diagnosis text */}
                        <text x="150" y="175" fontFamily="Arial" fontSize="10" fontWeight="bold" fill={theme.palette.primary.dark} textAnchor="middle">VIEW DETAILED DIAGNOSIS</text>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f0e6f6" />
                            <stop offset="100%" stopColor="#e1d1eb" />
                          </linearGradient>
                          <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor={theme.palette.primary.main} floodOpacity="0.3"/>
                          </filter>
                        </defs>
                        
                        {/* Background */}
                        <rect width="300" height="200" fill="url(#emailGradient)" />
                        <path d="M0,40 Q150,80 300,40 L300,0 L0,0 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        <path d="M0,160 Q150,120 300,160 L300,200 L0,200 Z" fill={theme.palette.primary.main} opacity="0.1" />
                        
                        {/* Email device */}
                        <rect x="60" y="40" width="180" height="120" rx="5" fill="white" stroke={theme.palette.primary.main} strokeWidth="2" filter="url(#shadow3)" />
                        
                        {/* Email header */}
                        <rect x="60" y="40" width="180" height="25" rx="5" fill={theme.palette.primary.main} />
                        <circle cx="72" cy="52" r="5" fill="white" opacity="0.7" />
                        <circle cx="87" cy="52" r="5" fill="white" opacity="0.7" />
                        <circle cx="102" cy="52" r="5" fill="white" opacity="0.7" />
                        
                        {/* Email subject */}
                        <rect x="75" y="75" width="150" height="10" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        
                        {/* Email body */}
                        <rect x="75" y="90" width="150" height="5" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        <rect x="75" y="100" width="150" height="5" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        <rect x="75" y="110" width="110" height="5" rx="2" fill={theme.palette.primary.main} fillOpacity="0.1" />
                        
                        {/* Attachment */}
                        <rect x="75" y="125" width="80" height="25" rx="3" fill={theme.palette.primary.main} fillOpacity="0.1" stroke={theme.palette.primary.main} strokeWidth="1" strokeDasharray="2" />
                        <text x="115" y="140" fontFamily="Arial" fontSize="8" fill={theme.palette.primary.dark} textAnchor="middle">DERMACARE_REPORT.PDF</text>
                        <path d="M85,135 h6 v5 h-6 Z M85,132 v-4 h4 l2,2 v2 Z M89,130 v2 h2 Z" fill={theme.palette.primary.main} />
                        
                        {/* Email animation */}
                        <g transform="translate(200, 20) scale(0.25)">
                          <path d="M100,100 v80 l50,-40 l50,40 v-80 Z" fill={theme.palette.primary.main} fillOpacity="0.7" stroke={theme.palette.primary.main} strokeWidth="3" />
                          <path d="M100,100 l50,40 l50,-40" fill="none" stroke={theme.palette.primary.main} strokeWidth="3" />
                          <animateTransform 
                            attributeName="transform" 
                            type="translate" 
                            from="0,0" 
                            to="0,15" 
                            dur="2s" 
                            repeatCount="indefinite" 
                            additive="sum" />
                        </g>
                        
                        {/* Send button */}
                        <rect x="165" y="125" width="60" height="25" rx="12.5" fill={theme.palette.primary.main} />
                        <text x="195" y="140" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">SEND</text>
                        
                        {/* Email confirmation text */}
                        <text x="150" y="175" fontFamily="Arial" fontSize="10" fontWeight="bold" fill={theme.palette.primary.dark} textAnchor="middle">EMAIL DELIVERED SECURELY</text>
                      </svg>
                    )}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Procedure;

// Add this to your global CSS file if not already present
if (!document.getElementById('procedure-animations')) {
  const style = document.createElement('style');
  style.id = 'procedure-animations';
  style.innerHTML = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
