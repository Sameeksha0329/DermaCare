import React from "react";
import { Grid, Typography, Box, Container, Card, CardMedia, CardContent, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const TeamMemberCard = ({ member, index }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      style={{ height: '100%' }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 320,
          overflow: 'hidden',
          height: '100%',
          borderRadius: '16px',
          background: 'transparent',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${gradients.primary.main}10, ${gradients.secondary.main}10)`,
            backdropFilter: 'blur(10px)',
            zIndex: 0,
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${member.accentColor || gradients.accent1}30 0%, ${member.accentColor || gradients.accent1}00 70%)`,
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradients.primary.main}20 0%, ${gradients.primary.main}00 70%)`,
            zIndex: 0,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box 
            sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 20px',
              border: `3px solid ${member.accentColor || gradients.accent1}50`,
              background: `linear-gradient(135deg, ${gradients.primary.light}40, ${gradients.secondary.light}40)`,
              boxShadow: `0 10px 20px ${gradients.primary.main}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Placeholder initials instead of image */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: member.accentColor || gradients.accent1,
              }}
            >
              {member.name.charAt(0)}
            </Typography>
          </Box>
          
          <CardContent sx={{ textAlign: 'center', pb: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: `linear-gradient(90deg, ${gradients.primary.main}, ${member.accentColor || gradients.accent1})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}
            >
              {member.name}
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                mb: 1.5,
              }}
            >
              {member.role}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 2, flexGrow: 1 }}
            >
              {member.description}
          </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
              {member.linkedin && (
                <motion.a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  style={{ color: gradients.primary.main }}
                >
                  <LinkedInIcon />
                </motion.a>
              )}
              {member.github && (
                <motion.a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  style={{ color: gradients.primary.main }}
                >
                  <GitHubIcon />
                </motion.a>
              )}
              {member.email && (
                <motion.a 
                  href={`mailto:${member.email}`} 
                  whileHover={{ y: -3 }}
                  style={{ color: gradients.primary.main }}
                >
                  <EmailIcon />
                </motion.a>
              )}
            </Box>
        </CardContent>
        </Box>
      </Card>
    </motion.div>
  );
};

const TeamPage = () => {
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
  
  // Team members data with expanded details
  const teamMembers = [
    {
      name: "Riya Jalan",
      role: "Frontend Developer",
      description: "Expert in React and UI/UX design with a passion for creating beautiful, intuitive user experiences.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "riya@dermacare.com",
      accentColor: gradients.accent1,
    },
    {
      name: "Sameeksha",
      role: "Machine Learning Engineer",
      description: "Specialized in computer vision and deep learning models for medical image analysis.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "sameeksha@dermacare.com",
      accentColor: gradients.secondary.main,
    },
    {
      name: "Nishvika",
      role: "Backend Developer",
      description: "Focused on building robust APIs and database architecture for scalable healthcare applications.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "nishvika@dermacare.com",
      accentColor: gradients.accent2,
    },
    {
      name: "Nandita",
      role: "Documentation Lead",
      description: "Dedicated to ensuring comprehensive documentation for all aspects of the DermaCare platform.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "nandita@dermacare.com",
      accentColor: '#9e75cc',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
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
          
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
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
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '25%',
                  width: '50%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${gradients.primary.main}, ${gradients.accent1})`,
                  borderRadius: '4px',
                }
              }}
            >
              Meet Our Team
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                px: 2,
                lineHeight: 1.6,
              }}
            >
              The brilliant minds behind DermaCare are dedicated to revolutionizing skin healthcare
              through innovative AI technology and user-friendly design.
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TeamMemberCard member={member} index={index} />
          </Grid>
        ))}
      </Grid>
          
          <Box 
            sx={{ 
              mt: 10, 
              p: 4, 
              textAlign: 'center',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${gradients.primary.main}08, ${gradients.secondary.main}10)`,
                backdropFilter: 'blur(5px)',
                zIndex: -1,
              }
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: gradients.primary.main,
              }}
            >
              Join Our Mission
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 3,
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              We're always looking for talented individuals passionate about healthcare innovation and technology.
              If you share our vision for making skin healthcare more accessible through AI, we'd love to hear from you.
            </Typography>
            
            <motion.a 
              href="mailto:careers@dermacare.com" 
              style={{ 
                display: 'inline-block',
                textDecoration: 'none',
                color: gradients.primary.main,
                fontWeight: 600,
                position: 'relative',
              }}
              whileHover={{ scale: 1.05 }}
            >
              careers@dermacare.com
            </motion.a>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default TeamPage;
