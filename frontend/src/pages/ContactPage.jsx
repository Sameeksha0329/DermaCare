import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography, Container, Box, useTheme, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";

const ContactUsForm = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add logic to send the form data to your server or perform any other actions.
    console.log(formData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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

          <Grid container justifyContent="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: { xs: 2, md: 5 },
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
                    Get in Touch
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                    Have questions about your skin health or need personalized advice? 
                    Our team of dermatology experts is here to help. Fill out the form and 
                    we'll get back to you as soon as possible.
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box 
                        sx={{ 
                          width: 45, 
                          height: 45, 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${gradients.primary.main}20, ${gradients.primary.accent}30)`,
                          mr: 2
                        }}
                      >
                        <EmailIcon sx={{ color: gradients.primary.main }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Email Us At</Typography>
                        <Typography variant="subtitle1" fontWeight="medium">support@dermacare.com</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box 
                        sx={{ 
                          width: 45, 
                          height: 45, 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${gradients.secondary.main}20, ${gradients.secondary.light}30)`,
                          mr: 2
                        }}
                      >
                        <MessageIcon sx={{ color: gradients.secondary.main }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Call Us</Typography>
                        <Typography variant="subtitle1" fontWeight="medium">+1 (800) SKIN-CARE</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Paper 
                  elevation={0}
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${gradients.primary.main}10, ${gradients.secondary.main}10)`,
                      backdropFilter: 'blur(10px)',
                      zIndex: -1,
                    }
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        mb: 3, 
                        fontWeight: '600',
                        color: gradients.primary.main
                      }}
                    >
                      Send us a Message
                    </Typography>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: gradients.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${gradients.primary.main}40`,
                            },
                            '&:hover fieldset': {
                              borderColor: gradients.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: gradients.primary.main,
                            },
                          },
                        }}
                      />
                      
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: gradients.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${gradients.primary.main}40`,
                            },
                            '&:hover fieldset': {
                              borderColor: gradients.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: gradients.primary.main,
                            },
                          },
                        }}
                      />
                      
              <TextField
                label="Subject"
                variant="outlined"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SubjectIcon sx={{ color: gradients.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${gradients.primary.main}40`,
                            },
                            '&:hover fieldset': {
                              borderColor: gradients.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: gradients.primary.main,
                            },
                          },
                        }}
                      />
                      
              <TextField
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                              <MessageIcon sx={{ color: gradients.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: `${gradients.primary.main}40`,
                            },
                            '&:hover fieldset': {
                              borderColor: gradients.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: gradients.primary.main,
                            },
                          },
                        }}
                      />
                      
              <Button
                type="submit"
                variant="contained"
                fullWidth
                        endIcon={<SendIcon />}
                        sx={{
                          mt: 2,
                          py: 1.5,
                          borderRadius: '30px',
                          background: `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`,
                          boxShadow: `0 8px 20px ${gradients.primary.main}40`,
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1rem',
                          '&:hover': {
                            background: `linear-gradient(45deg, ${gradients.primary.main} 30%, ${gradients.primary.accent} 90%)`,
                            boxShadow: `0 12px 28px ${gradients.primary.main}60`,
                          },
                        }}
                        className="hover-shine"
                      >
                        Send Message
              </Button>
            </form>
                  </Box>
          </Paper>
              </motion.div>
        </Grid>
      </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ContactUsForm;
