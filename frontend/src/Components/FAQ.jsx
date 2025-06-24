import React, { useState } from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

function FAQ() {
  const faqs = [
    {
      question: "What is this website for?",
      answer: "This website is designed to provide preliminary diagnoses of various skin conditions using artificial intelligence. It can help users identify potential skin issues based on uploaded images."
    },
    {
      question: "How does it work?",
      answer: "Users can upload an image of their skin condition, and our AI system will analyze the image to identify the skin condition. The results will be provided in a PDF report."
    },
    {
      question: "How long does it take to receive the diagnosis report?",
      answer: "The processing time may vary, but in most cases, you should receive the diagnosis report within a few minutes."
    },
    {
      question: "Can healthcare professionals use this tool?",
      answer: "Yes, healthcare professionals can use the tool to aid in their preliminary assessments, but it should not replace their clinical judgment."
    },
    {
      question: "How can I contact your support team for assistance?",
      answer: "You can contact our support team at dermacareofficialmail@gmail.com, and we will be happy to assist you with any questions or issues."
    }
  ];

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -30,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: '#f8f9fa',
          borderRadius: '50% 50% 0 0',
        }
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
              color="primary.dark"
            >
              Frequently Asked <Typography component="span" variant="h3" color="primary" fontWeight="bold">Questions</Typography>
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
              Find answers to common questions about DermaCare's features, functionality, and services
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Accordion
                sx={{
                  mb: 2,
                  boxShadow: 'none',
                  borderRadius: '10px !important',
                  overflow: 'hidden',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  sx={{
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: 'rgba(162, 133, 188, 0.1)',
                    },
                    '&.Mui-expanded': {
                      backgroundColor: 'rgba(162, 133, 188, 0.1)',
                    },
                    borderRadius: '10px',
                    py: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="500" color="primary.dark">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FAQ;
