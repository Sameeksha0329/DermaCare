import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      sx={{ 
        bgcolor: '#494368', 
        color: 'white',
        pt: 8,
        pb: 3,
        mt: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: '30px',
          background: '#494368',
          borderRadius: '50% 50% 0 0',
        }
      }}
      className="fade-in"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MedicalServicesIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold">
                DermaCare
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Providing advanced dermatological care with the latest technology and a compassionate approach to every patient.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                className="hover-glow"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                className="hover-glow"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                className="hover-glow"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                className="hover-glow"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="/" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Home
              </Link>
              <Link 
                href="/image" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Checkup
              </Link>
              <Link 
                href="/team" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Our Team
              </Link>
              <Link 
                href="/contact-us" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Us
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Departments
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="#" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                General Medicine
              </Link>
              <Link 
                href="#" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Dermatology
              </Link>
              <Link 
                href="#" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Cosmetic Surgery
              </Link>
              <Link 
                href="#" 
                underline="none" 
                color="inherit"
                sx={{ 
                  opacity: 0.8,
                  '&:hover': { 
                    opacity: 1,
                    color: '#c5b1d8',
                    pl: 0.5 
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Skin Cancer
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1, color: '#c5b1d8' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  123 Health St., Wellness City, WH 45678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1, color: '#c5b1d8' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  (123) 456-7890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, color: '#c5b1d8' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  contact@dermacare.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 6, mb: 3, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {currentYear} DermaCare. All rights reserved. Dedicated to your skin health.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
