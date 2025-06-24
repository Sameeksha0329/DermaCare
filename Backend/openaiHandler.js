import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Get API key from environment variables
const API_KEY = process.env.OPENAI_API_KEY || 'sk-dummykey123456789abcdefghijklmnopqrstuvwxyz'; 
console.log('OpenAI/Groq API Key status:', API_KEY ? 'Set (first 3 chars: ' + API_KEY.substring(0, 3) + '...)' : 'Not set');

const getDiagnosis = async (prompt) => {
  try {
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Using Groq API

    const requestData = {
      model: 'llama3-8b-8192', // Using llama3 model on Groq
      messages: [
        { 
          role: 'system', 
          content: `You are a **dermatologist** 🧑‍⚕️ specializing in skin diseases. 
          Your responses should be **well-structured, easy to read, and visually appealing**. 
          Use **bold text, line breaks, bullet points, and relevant emojis** to make the diagnosis engaging.  
          
          ❗ Important: If the user asks about **non-skin diseases**, respond with: 
          "If the user does not enter specific disease name dont respond with any disease just respond no such disease exist and only respond if the name which user entered is somewhat close to the disease name "  
          "⚠️ I specialize only in **skin-related conditions**! Please ask about skin diseases like acne, eczema, psoriasis, etc. 😊"` 
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    // Send request to GROQ API
    const response = await axios.post(apiUrl, requestData, { headers });

    // Extract the correct field safely
    const diagnosis = response.data.choices?.[0]?.message?.content || '⚠️ No valid response received. Please try again.';

    return diagnosis;
  } catch (error) {
    console.error('Error fetching diagnosis:', error?.response?.data || error.message);
    throw new Error('Failed to get diagnosis from GROQ API');
  }
};

// Function for AI chatbot that references the user's diagnosis
const getChatbotResponse = async (userMessage, diagnosisReport = null) => {
  try {
    console.log('Getting chatbot response for message:', userMessage);
    if (diagnosisReport) {
      console.log('With diagnosis context available');
    } else {
      console.log('No diagnosis context available');
    }
    
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    // Create a system message based on whether we have a diagnosis report
    let systemMessage = '';
    if (diagnosisReport) {
      systemMessage = `You are an AI medical assistant specialized in dermatology. You have access to the following patient diagnosis report:
      
      ${diagnosisReport}
      
      Use this information to provide accurate, helpful responses to questions about this specific skin condition. 
      If the user asks about something not related to this diagnosis, you can still provide general skin care information.
      Format your responses with bullet points, bold text, and emojis where appropriate to make them easy to read.
      
      Always clarify that you are an AI assistant and not a replacement for professional medical advice.`;
    } else {
      systemMessage = `You are an AI medical assistant specialized in dermatology.
      Provide accurate, helpful information about skin conditions and skin care.
      Format your responses with bullet points, bold text, and emojis where appropriate to make them easy to read.
      
      Always clarify that you are an AI assistant and not a replacement for professional medical advice.`;
    }

    const requestData = {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
    };

    console.log('Sending request to Groq API...');
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    
    console.log('Received response from Groq API');
    
    // Extract the message content
    const chatResponse = response.data.choices?.[0]?.message?.content || 
      '⚠️ I apologize, but I was unable to process your request. Please try asking again.';
    
    return chatResponse;
  } catch (error) {
    console.error('Error getting chatbot response:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    
    return '⚠️ I apologize for the inconvenience, but I encountered an issue while processing your request. Please try again later.';
  }
};

export { getDiagnosis, getChatbotResponse };
export default getDiagnosis;
