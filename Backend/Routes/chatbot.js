import { getChatbotResponse } from '../openaiHandler.js';
import DiagnosisModel from '../DB/diagnosisModel.js';

// Handler for the chatbot API
const chatbotMessage = async (req, res) => {
  console.log('==== Chatbot API called ====');
  console.log('Request body:', req.body);
  console.log('Auth token present:', !!req.headers.token);
  
  try {
    // Simple test response for debugging
    if (req.body.message === 'test') {
      return res.json({ response: "Test response successful!" });
    }
    
    const { message, diagnosisId } = req.body;
    
    if (!message) {
      console.log('Error: No message provided in request');
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get the user ID from the authenticated user
    const userId = req.userId;
    console.log('User ID from auth:', userId);
    
    let diagnosisReport = null;
    
    // If diagnosisId is provided, fetch the diagnosis report to provide context
    if (diagnosisId) {
      try {
        console.log('Fetching diagnosis with ID:', diagnosisId);
        // First try to find by MongoDB ObjectId
        let diagnosis = null;
        
        // Try to find diagnosis based on the index from the report URL
        // The diagnosisId here might be an index rather than an ObjectId
        const userImages = await DiagnosisModel.find({ userId }).sort({ createdAt: -1 });
        console.log(`Found ${userImages.length} diagnosis records for user`);
        
        if (userImages && userImages.length > 0) {
          const index = parseInt(diagnosisId);
          if (!isNaN(index) && index >= 0 && index < userImages.length) {
            diagnosis = userImages[index];
            console.log('Found diagnosis by index:', diagnosis.diseaseName);
          }
        }
        
        if (diagnosis) {
          diagnosisReport = `Disease: ${diagnosis.diseaseName}\n${diagnosis.diseaseInfoResponse}\n\nRecommended Treatments: ${diagnosis.medicinesResponse}`;
          console.log('Created diagnosis report context');
        } else {
          console.log('No diagnosis found with the provided ID/index');
        }
      } catch (error) {
        console.error('Error fetching diagnosis report:', error);
        // Continue without the report if we can't fetch it
      }
    }
    
    console.log('Calling OpenAI for chatbot response...');
    
    // For testing, return a hardcoded response instead of calling the API
    // const chatResponse = "This is a test response from the chatbot. I'll provide actual AI responses when properly configured.";
    
    // Get response from the AI chatbot
    const chatResponse = await getChatbotResponse(message, diagnosisReport);
    console.log('Received response from OpenAI');
    
    // Return the response
    console.log('Sending successful response back to client');
    res.json({ response: chatResponse });
    
  } catch (error) {
    console.error('Error in chatbot route:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Failed to process chatbot request',
      details: error.message 
    });
  }
};

// Make sure to export correctly
export { chatbotMessage }; 