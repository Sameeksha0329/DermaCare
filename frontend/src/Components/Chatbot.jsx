import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, IconButton, Tooltip, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext';

const Chatbot = ({ diagnosisId = null, diagnosisText = null }) => {
  const { token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: diagnosisId 
        ? "Hello! I can help you understand your diagnosis better. What would you like to know?" 
        : "Hello! I'm your DermaCare assistant. How can I help you with your skin concerns today?", 
      sender: 'bot' 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message to chat
    const userMessageObj = { id: Date.now(), text: newMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessageObj]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Send request to backend with auth token in headers
      console.log('Sending request to chatbot API...');
      console.log('Token present:', !!token);
      console.log('Diagnosis ID:', diagnosisId);
      
      // Use the real chatbot endpoint with auth
      const endpoint = '/api/chatbot';
      
      console.log(`Sending request to: http://localhost:5000${endpoint}`);
      
      const response = await axios.post(
        `http://localhost:5000${endpoint}`, 
        { 
          message: newMessage,
          diagnosisId: diagnosisId
        },
        { 
          headers: { token },
        }
      );
      
      console.log('Received response from chatbot API:', response.data);
      
      // Add bot response to chat
      const botMessageObj = { 
        id: Date.now() + 1, 
        text: response.data.response, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMessageObj]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // If there's a 404 error, try the simple chatbot endpoint as fallback
      if (error.response && error.response.status === 404) {
        try {
          console.log('Attempting to use fallback simple-chatbot endpoint...');
          const fallbackResponse = await axios.post(
            'http://localhost:5000/api/simple-chatbot',
            { message: newMessage }
          );
          
          const botMessageObj = { 
            id: Date.now() + 1, 
            text: fallbackResponse.data.response, 
            sender: 'bot' 
          };
          
          setMessages(prev => [...prev, botMessageObj]);
          return;
        } catch (fallbackError) {
          console.error('Fallback chatbot also failed:', fallbackError);
        }
      }
      
      // Add error message
      const errorMessageObj = { 
        id: Date.now() + 1, 
        text: "Sorry, I'm having trouble responding right now. Please try again later.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Floating button when chatbot is closed */}
      {!isOpen && (
        <Tooltip title="Chat with DermaCare AI">
          <IconButton 
            onClick={toggleChatbot}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 60,
              height: 60,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              boxShadow: 3
            }}
          >
            <ChatBubbleOutlineIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      
      {/* Chatbot window when open */}
      {isOpen && (
        <Paper 
          elevation={3}
          sx={{
            width: { xs: '90vw', sm: 350 },
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Chat header */}
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'primary.main', 
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="DermaCare" src="/dermacare-logo.png" sx={{ mr: 1, bgcolor: 'white' }}>
                <ChatBubbleOutlineIcon color="primary" />
              </Avatar>
              <Typography variant="h6">DermaCare Assistant</Typography>
            </Box>
            <IconButton onClick={toggleChatbot} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Messages area */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: '#f5f5f5'
            }}
          >
            {messages.map((msg) => (
              <Box 
                key={msg.id}
                sx={{
                  maxWidth: '75%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: msg.sender === 'user' ? 'primary.light' : 'white',
                  color: msg.sender === 'user' ? 'white' : 'text.primary',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1
                }}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <Typography>{msg.text}</Typography>
                )}
              </Box>
            ))}
            {isLoading && (
              <Box 
                sx={{
                  maxWidth: '75%',
                  alignSelf: 'flex-start',
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress size={20} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
          
          {/* Input area */}
          <Box 
            component="form" 
            onSubmit={handleSendMessage}
            sx={{ 
              p: 2, 
              bgcolor: 'background.paper',
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex'
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading}
              sx={{ mr: 1 }}
            />
            <Button 
              color="primary" 
              variant="contained" 
              endIcon={<SendIcon />}
              disabled={!newMessage.trim() || isLoading}
              type="submit"
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Chatbot; 