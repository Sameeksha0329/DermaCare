import React, { useContext, useState, useEffect } from "react";
import "../assets/css/Homepage.scss";
import Login from "../Components/Login";
import { AuthContext } from "../context/AuthContext";
import CheckupCard from "../Components/CheckupCard";
import Procedure from "../Components/Procedure";
import CommonDiseases from "../Components/CommonDiseases";
import Loader from "../Components/Loader";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia, Paper } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScienceIcon from '@mui/icons-material/Science';
import imageVector from "../assets/icons/image-vector.png"; // Using an existing image

function Homepage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (loading) return <Loader message={"Validating credentials..."} />;

  return (
    <>
        {!isLoggedIn ? (
        <Box sx={{ width: '100%' }} className="fade-in">
          <Box 
            sx={{
              backgroundColor: '#a285bc',
              color: 'white',
              py: 8,
              backgroundImage: 'linear-gradient(135deg, #a285bc 0%, #8c6ca8 100%)',
              borderRadius: '0 0 20% 20%/0 0 10% 10%',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(138, 108, 168, 0.2)',
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} className="slide-in-left">
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: 3
                    }}
                  >
                    Cutting-Edge <br />Medical Care for Your Skin
                  </Typography>
                  <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
                    DermaCare brings advanced technology and compassionate care together for your dermatological needs.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    sx={{ 
                      mr: 2, 
                      py: 1.5, 
                      px: 4,
                      boxShadow: '0 4px 20px rgba(92, 107, 192, 0.4)',
                    }}
                    className="hover-lift pulse"
                    onClick={() => setLoading(true)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      py: 1.5, 
                      px: 4,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white',
                      }
                    }}
                    className="hover-lift"
                  >
                    Learn More
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} className="slide-in-right">
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '80%',
                        height: '80%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        zIndex: 0,
                        transform: 'rotate(3deg)',
                      }
                    }}
                  >
                    <Paper 
                      elevation={5}
                      sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        transform: 'perspective(1500px) rotateY(-10deg)',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.5s ease-in-out',
                        '&:hover': {
                          transform: 'perspective(1500px) rotateY(0deg)',
                        },
                        backgroundColor: 'transparent'
                      }}
                    >
                      <img 
                        src={imageVector}
                        alt="Medical professionals" 
                        style={{ 
                          width: '100%', 
                          height: 'auto', 
                          display: 'block',
                          mixBlendMode: 'multiply'
                        }}
                      />
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ my: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom 
              color="primary.dark"
              fontWeight="bold"
              className="fade-in"
              sx={{ mb: 6 }}
            >
              Cutting-Edge Medical Equipment and Facilities
            </Typography>

            <Grid container spacing={4} className="fade-in">
              <Grid item xs={12} sm={6} md={3}>
                <Card className="hover-lift" sx={{ height: '100%', borderRadius: '16px' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      Modern Operating Rooms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Equipped with the latest surgical technology to ensure precise and safe procedures.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card className="hover-lift" sx={{ height: '100%', borderRadius: '16px' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <ScienceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      Advanced Imaging
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      High-tech imaging equipment for accurate diagnostics and treatment planning.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card className="hover-lift" sx={{ height: '100%', borderRadius: '16px' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <HealthAndSafetyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      Rehabilitation Services
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Facilities designed to help patients recovering from skin conditions and procedures.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card className="hover-lift" sx={{ height: '100%', borderRadius: '16px' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <MedicalServicesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      Specialized Care
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dedicated areas for specialized dermatological treatments and procedures.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h3" 
                component="h2" 
                align="center" 
                gutterBottom 
                color="primary.dark"
                fontWeight="bold"
                className="fade-in"
                sx={{ mb: 6 }}
              >
                Our Services
              </Typography>

              <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Login setLoading={setLoading} />
              </Box>
            </Container>
          </Box>
        </Box>
          ) : (
        <Box sx={{ width: '100%', py: 4 }}>
          <Container maxWidth="lg">
          <CheckupCard />
          </Container>
        </Box>
        )}

      <Box sx={{ mt: 4 }}>
      <div className="procedure-section">
        <Procedure />
      </div>
      <CommonDiseases />
      <FAQ />
      <Footer />
      </Box>
    </>
  );
}

export default Homepage;
