import React, { useContext, useState } from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Divider, 
  Grid, 
  IconButton, 
  InputAdornment,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Signup from "./Signup";
import { AuthContext } from "../context/AuthContext";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function Login({ setLoading }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(false);
  const [isflipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login: setDetails } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Create an object with email and password
      const data = {
        email,
        password,
      };

      // Replace 'your_api_endpoint' with the actual API endpoint you want to send the data to
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      setDetails(response?.data?.token, response?.data?.username);

      // Handle the API response here, e.g., set user authentication, redirect, etc.
      console.log("API Response:", response); // You can log the response for debugging
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
    }

    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (signup) {
    return !isflipped && <Signup setLoading={() => {}} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper 
            elevation={3}
            sx={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(138, 108, 168, 0.15)'
            }}
          >
      <Grid container>
              <Grid 
                item 
                xs={12} 
                md={5}
                sx={{ 
                  bgcolor: 'primary.main',
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  display: { xs: 'none', md: 'flex' },
                  minWidth: { md: '220px' },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-30%',
                    left: '-20%',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                  }
                  }}
                >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <MedicalServicesIcon sx={{ color: 'white', fontSize: 40, mr: 2 }} />
                    <Typography variant="h4" component="div" color="white" fontWeight="bold" sx={{ 
                      whiteSpace: 'nowrap',
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                      letterSpacing: '0.5px'
                    }}>
                      
                    </Typography>
                  </Box>
                  
                  <Typography variant="h5" component="div" color="white" fontWeight="bold" sx={{ mb: 2 }}>
                    Welcome Back!
                  </Typography>
                  
                  <Typography variant="body1" color="white" sx={{ opacity: 0.9, mb: 4, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    Access your account to get personalized skin analysis and treatment recommendations.
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="body2" color="white" sx={{ opacity: 0.8, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                      "The skin is the window to our internal health."
                    </Typography>
                    <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                      - Dr. Howard Murad
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={7}>
                <Box sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="div" 
                    fontWeight="bold" 
                    color="primary.dark"
                    sx={{ mb: 1 }}
                  >
                    Log In
                  </Typography>
                  
                  {error && (
                    <Typography 
                      variant="body2" 
                      color="error" 
                      sx={{ mb: 2 }}
                    >
                      User not registered. Please sign up first.
                    </Typography>
                  )}
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Please enter your credentials to access your account
                  </Typography>
                  
                  <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      margin="normal"
                placeholder="Enter your email address"
                      required
                type="email"
                      value={email}
                onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      margin="normal"
                placeholder="Enter your password"
                required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                            sx={{ color: 'primary.main' }}
              />
                        }
                        label={<Typography variant="body2">Remember Me</Typography>}
                      />

                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleLogin}
                      sx={{ 
                        mt: 3, 
                        mb: 2,
                        py: 1.5,
                        borderRadius: '10px',
                      }}
                      className="hover-lift"
                    >
            Log In
                    </Button>
                    
                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        OR
                      </Typography>
                    </Divider>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      size="large"
                      startIcon={<GoogleIcon />}
                      sx={{ 
                        mb: 3,
                        py: 1.5,
                        borderRadius: '10px',
                      }}
                      className="hover-lift"
                    >
                      Sign in with Google
                    </Button>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" display="inline" mr={1}>
                        Don't have an account?
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        fontWeight="bold"
                        display="inline"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
                        onClick={() => setSignup(true)}
                      >
              Sign Up
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}
