@echo off
echo Setting up the AI Chatbot feature for DermaCare...

rem Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install react-markdown --save

rem Install backend dependencies
echo Installing backend dependencies...
cd ..\Backend
call npm install

echo.
echo Setup complete! The AI Chatbot feature is now ready to use.
echo.
echo To use the chatbot:
echo 1. After a diagnosis report is generated, the chatbot will appear in the report page
echo 2. Click on the chat icon in the bottom right corner to open the chatbot
echo 3. Ask questions about your diagnosis, treatment options, or general skin health
echo.
echo Note: Make sure both the frontend and backend servers are running.
pause 