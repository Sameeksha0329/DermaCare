import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider, useTheme } from "@mui/material";
import { motion } from "framer-motion";

function CommonDiseases() {
  const theme = useTheme();
  
  const diseases = [
    {
      name: "Acne",
      description: "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells, leading to pimples, blackheads, and whiteheads.",
      color: theme.palette.treatment.acne,
      delay: 0,
    },
    {
      name: "Psoriasis",
      description: "Psoriasis is known for its silvery scales and often affects joints. It causes red patches of skin covered with silvery scales and can be painful and itchy.",
      color: theme.palette.treatment.psoriasis,
      delay: 0.1,
    },
    {
      name: "Vitiligo",
      description: "Vitiligo causes white patches due to pigment loss, impacting the skin's appearance. It's thought to be an autoimmune condition affecting melanocytes.",
      color: theme.palette.treatment.vitiligo,
      delay: 0.2,
    },
    {
      name: "Eczema",
      description: "Eczema, marked by dry, itchy patches, can worsen with triggers like stress or irritants. Regular moisturizing and avoiding triggers help manage flare-ups.",
      color: theme.palette.treatment.eczema,
      delay: 0.3,
    },
    {
      name: "Candidiasis",
      description: "Fungal infections like candidiasis cause discomfort, itching, and visible rashes. Maintaining hygiene and using antifungal treatments help eliminate infection.",
      color: theme.palette.treatment.candidiasis,
      delay: 0.4,
    },
  ];

  // Helper function to generate SVG illustrations based on condition type
  const getIllustration = (disease) => {
    switch(disease.name) {
      case "Acne":
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="acneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={disease.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={disease.color} stopOpacity="0.5" />
              </linearGradient>
              <filter id="acneShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor={disease.color} floodOpacity="0.3"/>
              </filter>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="#f8f9fa" />
            
            {/* Face outline */}
            <ellipse cx="200" cy="150" rx="120" ry="140" fill="#fff" stroke={disease.color} strokeWidth="2" filter="url(#acneShadow)" />
            
            {/* Acne spots */}
            <circle cx="160" cy="100" r="15" fill="url(#acneGradient)" stroke={disease.color} strokeWidth="1" />
            <circle cx="240" cy="120" r="12" fill="url(#acneGradient)" stroke={disease.color} strokeWidth="1" />
            <circle cx="190" cy="170" r="10" fill="url(#acneGradient)" stroke={disease.color} strokeWidth="1" />
            <circle cx="130" cy="150" r="8" fill="url(#acneGradient)" stroke={disease.color} strokeWidth="1" />
            <circle cx="220" cy="90" r="7" fill="url(#acneGradient)" stroke={disease.color} strokeWidth="1" />
            
            {/* Face features */}
            <ellipse cx="160" cy="120" rx="10" ry="8" fill={theme.palette.primary.dark} fillOpacity="0.7" />
            <ellipse cx="240" cy="120" rx="10" ry="8" fill={theme.palette.primary.dark} fillOpacity="0.7" />
            <path d="M170,170 Q200,190 230,170" fill="none" stroke={theme.palette.primary.dark} strokeWidth="3" strokeLinecap="round" />
            
            {/* Decorative elements */}
            <text x="200" y="250" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill={theme.palette.primary.main}>ACNE TREATMENT</text>
            <circle cx="40" cy="40" r="20" fill={disease.color} fillOpacity="0.2" />
            <circle cx="360" cy="260" r="30" fill={disease.color} fillOpacity="0.2" />
          </svg>
        );
      case "Psoriasis":
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="psoriasisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={disease.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={disease.color} stopOpacity="0.5" />
              </linearGradient>
              <pattern id="scalePattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="none" />
                <path d="M0,0 L10,10 L20,0 M0,20 L10,10 L20,20" stroke={disease.color} strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="#f8f9fa" />
            
            {/* Arm outline */}
            <path d="M100,50 C150,30 250,30 300,50 S300,250 250,270 S150,270 100,250 S50,70 100,50 Z" fill="#fff" stroke={disease.color} strokeWidth="2" />
            
            {/* Psoriasis patches */}
            <path d="M120,100 Q150,80 180,100 Q200,120 170,130 Q140,140 120,100 Z" fill="url(#psoriasisGradient)" stroke={disease.color} strokeWidth="1" />
            <path d="M220,120 Q250,100 280,120 Q300,140 270,150 Q240,160 220,120 Z" fill="url(#psoriasisGradient)" stroke={disease.color} strokeWidth="1" />
            <path d="M170,180 Q200,160 230,180 Q250,200 220,210 Q190,220 170,180 Z" fill="url(#psoriasisGradient)" stroke={disease.color} strokeWidth="1" />
            
            {/* Scale pattern overlay */}
            <path d="M120,100 Q150,80 180,100 Q200,120 170,130 Q140,140 120,100 Z" fill="url(#scalePattern)" fillOpacity="0.5" />
            <path d="M220,120 Q250,100 280,120 Q300,140 270,150 Q240,160 220,120 Z" fill="url(#scalePattern)" fillOpacity="0.5" />
            <path d="M170,180 Q200,160 230,180 Q250,200 220,210 Q190,220 170,180 Z" fill="url(#scalePattern)" fillOpacity="0.5" />
            
            {/* Medical symbols */}
            <circle cx="330" cy="70" r="15" fill={theme.palette.primary.main} fillOpacity="0.2" />
            <path d="M330,60 v20 M320,70 h20" stroke={theme.palette.primary.main} strokeWidth="2" />
            
            <text x="200" y="250" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill={theme.palette.primary.main}>PSORIASIS TREATMENT</text>
          </svg>
        );
      case "Vitiligo":
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vitiligoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={disease.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={disease.color} stopOpacity="0.5" />
              </linearGradient>
              <mask id="vitiligoMask">
                <rect width="100%" height="100%" fill="white" />
                <ellipse cx="160" cy="120" rx="40" ry="30" fill="black" />
                <ellipse cx="250" cy="170" rx="30" ry="40" fill="black" />
                <ellipse cx="180" cy="220" rx="20" ry="15" fill="black" />
              </mask>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="#f8f9fa" />
            
            {/* Skin outline */}
            <rect x="80" y="50" width="240" height="200" rx="20" fill="#b58772" />
            
            {/* Vitiligo patches */}
            <rect x="80" y="50" width="240" height="200" rx="20" fill="white" mask="url(#vitiligoMask)" />
            
            {/* Highlight the patches */}
            <ellipse cx="160" cy="120" rx="40" ry="30" fill="none" stroke={disease.color} strokeWidth="2" strokeDasharray="5,2" />
            <ellipse cx="250" cy="170" rx="30" ry="40" fill="none" stroke={disease.color} strokeWidth="2" strokeDasharray="5,2" />
            <ellipse cx="180" cy="220" rx="20" ry="15" fill="none" stroke={disease.color} strokeWidth="2" strokeDasharray="5,2" />
            
            {/* Treatment indicators */}
            <path d="M160,120 L120,70" stroke={theme.palette.primary.main} strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="120" cy="70" r="10" fill={theme.palette.primary.main} fillOpacity="0.7" />
            <text x="120" y="60" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="white">UV</text>
            
            <path d="M250,170 L300,120" stroke={theme.palette.primary.main} strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="300" cy="120" r="10" fill={theme.palette.primary.main} fillOpacity="0.7" />
            <text x="300" y="123" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="white">T</text>
            
            <text x="200" y="270" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill={theme.palette.primary.main}>VITILIGO TREATMENT</text>
          </svg>
        );
      case "Eczema":
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="eczemaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={disease.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={disease.color} stopOpacity="0.6" />
              </linearGradient>
              <pattern id="eczemaPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M2.5,2.5 L7.5,7.5 M7.5,2.5 L2.5,7.5" stroke={disease.color} strokeWidth="0.5" />
              </pattern>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="#f8f9fa" />
            
            {/* Arm illustration */}
            <path d="M100,150 C100,70 150,50 200,50 S300,70 300,150 S250,250 200,250 S100,230 100,150 Z" fill="#fff1e6" stroke={disease.color} strokeWidth="2" />
            
            {/* Eczema patches */}
            <path d="M150,120 Q170,100 190,120 Q200,130 190,150 Q170,170 150,150 Q145,135 150,120 Z" fill="url(#eczemaGradient)" stroke={disease.color} strokeWidth="1" />
            <path d="M220,130 Q240,110 260,130 Q270,140 260,160 Q240,180 220,160 Q215,145 220,130 Z" fill="url(#eczemaGradient)" stroke={disease.color} strokeWidth="1" />
            <path d="M180,170 Q200,150 220,170 Q230,180 220,200 Q200,220 180,200 Q175,185 180,170 Z" fill="url(#eczemaGradient)" stroke={disease.color} strokeWidth="1" />
            
            {/* Texture overlay */}
            <path d="M150,120 Q170,100 190,120 Q200,130 190,150 Q170,170 150,150 Q145,135 150,120 Z" fill="url(#eczemaPattern)" />
            <path d="M220,130 Q240,110 260,130 Q270,140 260,160 Q240,180 220,160 Q215,145 220,130 Z" fill="url(#eczemaPattern)" />
            <path d="M180,170 Q200,150 220,170 Q230,180 220,200 Q200,220 180,200 Q175,185 180,170 Z" fill="url(#eczemaPattern)" />
            
            {/* Treatment elements */}
            <path d="M80,80 L140,110" stroke={theme.palette.secondary.main} strokeWidth="1" strokeDasharray="3,2" />
            <rect x="50" y="60" width="40" height="30" rx="5" fill={theme.palette.secondary.main} fillOpacity="0.8" />
            <text x="70" y="80" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="white">CREAM</text>
            
            <path d="M320,80 L250,110" stroke={theme.palette.secondary.main} strokeWidth="1" strokeDasharray="3,2" />
            <rect x="310" y="60" width="40" height="30" rx="5" fill={theme.palette.secondary.main} fillOpacity="0.8" />
            <text x="330" y="80" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="white">LOTION</text>
            
            <text x="200" y="270" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill={theme.palette.primary.main}>ECZEMA TREATMENT</text>
          </svg>
        );
      case "Candidiasis":
        return (
          <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="candidiasisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={disease.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={disease.color} stopOpacity="0.5" />
              </linearGradient>
              <pattern id="yeastPattern" patternUnits="userSpaceOnUse" width="15" height="15">
                <circle cx="7.5" cy="7.5" r="3" fill={disease.color} fillOpacity="0.3" />
              </pattern>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="#f8f9fa" />
            
            {/* Skin section */}
            <rect x="80" y="50" width="240" height="200" rx="20" fill="#f8d0c8" stroke={disease.color} strokeWidth="2" />
            
            {/* Candidiasis areas */}
            <path d="M120,100 Q150,80 180,100 Q210,120 180,140 Q150,160 120,140 Q100,120 120,100 Z" fill="url(#candidiasisGradient)" stroke={disease.color} strokeWidth="1.5" />
            <path d="M220,120 Q250,100 280,120 Q300,140 280,160 Q250,180 220,160 Q200,140 220,120 Z" fill="url(#candidiasisGradient)" stroke={disease.color} strokeWidth="1.5" />
            <path d="M160,180 Q190,160 220,180 Q240,200 220,220 Q190,240 160,220 Q140,200 160,180 Z" fill="url(#candidiasisGradient)" stroke={disease.color} strokeWidth="1.5" />
            
            {/* Yeast pattern overlay */}
            <path d="M120,100 Q150,80 180,100 Q210,120 180,140 Q150,160 120,140 Q100,120 120,100 Z" fill="url(#yeastPattern)" />
            <path d="M220,120 Q250,100 280,120 Q300,140 280,160 Q250,180 220,160 Q200,140 220,120 Z" fill="url(#yeastPattern)" />
            <path d="M160,180 Q190,160 220,180 Q240,200 220,220 Q190,240 160,220 Q140,200 160,180 Z" fill="url(#yeastPattern)" />
            
            {/* Antifungal treatment visualization */}
            <circle cx="60" cy="60" r="20" fill={theme.palette.primary.main} fillOpacity="0.1" stroke={theme.palette.primary.main} strokeWidth="1" />
            <path d="M53,60 h14 M60,53 v14" stroke={theme.palette.primary.main} strokeWidth="2" />
            
            <circle cx="340" cy="60" r="20" fill={theme.palette.secondary.main} fillOpacity="0.1" stroke={theme.palette.secondary.main} strokeWidth="1" />
            <path d="M333,60 h14" stroke={theme.palette.secondary.main} strokeWidth="2" />
            
            <text x="200" y="270" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill={theme.palette.primary.main}>CANDIDIASIS TREATMENT</text>
          </svg>
        );
      default:
        return null;
    }
  };

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
      className="section-container"
    >
      {/* Additional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.light}00 70%)`,
          zIndex: 0,
          animation: 'pulse 15s infinite ease-in-out',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20 0%, ${theme.palette.secondary.light}00 70%)`,
          zIndex: 0,
          animation: 'pulse 12s infinite ease-in-out alternate',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
                background: `linear-gradient(90deg, ${theme.palette.treatment.acne}, ${theme.palette.treatment.psoriasis}, ${theme.palette.treatment.vitiligo}, ${theme.palette.treatment.eczema}, ${theme.palette.treatment.candidiasis})`,
              }}
            />
            
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              gutterBottom
              color="primary.dark"
              sx={{ position: 'relative' }}
            >
              Our <Typography component="span" variant="h3" color="primary" fontWeight="bold">Popular</Typography> Treatments
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
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Whether you have hormonal acne, or just want to reduce signs of ageing, 
              we are here for you every step of the way. You get long-term & 
              result-based care for your specific concern or goal.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {diseases.map((disease, index) => (
            <Grid item xs={12} sm={6} md={4} key={disease.name}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: disease.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="hover-lift hover-shine" 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    borderTop: `5px solid ${disease.color}`,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${disease.color}08 0%, ${disease.color}00 50%, ${disease.color}08 100%)`,
                      zIndex: 0,
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      overflow: 'hidden',
                      background: '#f8f9fa',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {getIllustration(disease)}
                    
                    {/* Animated corner accent */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '40px',
                        height: '40px',
                        background: disease.color,
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                        opacity: 0.2,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3, position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      fontWeight="bold"
                      color="primary.dark"
                    >
                      {disease.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {disease.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0, position: 'relative', zIndex: 1 }}>
                    <Button 
                      variant="text" 
                      color="primary"
                      sx={{ 
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: `${disease.color}20`,
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" mt={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: '30px',
                boxShadow: '0 10px 20px rgba(133, 104, 165, 0.3)',
                position: 'relative',
                overflow: 'hidden',
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
              View All Treatments
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

export default CommonDiseases;
