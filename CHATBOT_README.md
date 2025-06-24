# DermaCare AI Chatbot

## Overview
The DermaCare AI Chatbot is an innovative feature that allows users to ask questions about their skin diagnosis after receiving a report. The chatbot uses the same AI model that generated their diagnosis report to provide detailed, contextual answers about their specific condition.

## Features
- **Personalized Responses**: The chatbot has access to the user's diagnosis report, allowing it to provide personalized information about the specific skin condition.
- **Medical Information**: Get detailed information about symptoms, treatments, medications, and preventive measures for skin conditions.
- **User-Friendly Interface**: Clean, modern interface with a floating chat button that appears on the report page.
- **Markdown Support**: Responses are formatted with headings, bullet points, and other Markdown elements for better readability.

## How to Use
1. After uploading a skin image and receiving a diagnosis report, you'll see a section at the bottom of the report introducing the AI assistant.
2. Click on the chat icon in the bottom-right corner of the screen to open the chatbot.
3. Type your question about your diagnosis, treatment options, or general skin health in the text field.
4. Press "Send" or hit Enter to submit your question.
5. The AI will process your question and provide a detailed response, taking into account your specific diagnosis.

## Sample Questions to Ask
- "What are the common causes of [my diagnosed condition]?"
- "How long does it typically take to treat [my condition]?"
- "Are there any home remedies for [my condition]?"
- "What preventive measures should I take to avoid [my condition] in the future?"
- "What are the side effects of the suggested medicines?"
- "Is [my condition] contagious?"
- "How can I manage the symptoms of [my condition]?"

## Technical Implementation
The AI chatbot uses:
- Backend: Node.js with Express
- Frontend: React with Material UI
- AI: Integration with the Groq API (Llama3-8b-8192 model)
- Authentication: JWT tokens to ensure user data security

## Setup Instructions
To set up the AI chatbot feature:

### Windows:
1. Run the `setup_chatbot.bat` script by double-clicking it.
2. Wait for the installation to complete.

### Mac/Linux:
1. Open a terminal in the project root directory.
2. Run `chmod +x setup_chatbot.sh` to make the script executable.
3. Run `./setup_chatbot.sh` to install the dependencies.

## Important Note
While the AI chatbot provides valuable information, it is not a replacement for professional medical advice. Always consult with a qualified dermatologist or healthcare provider for proper diagnosis and treatment of skin conditions. 