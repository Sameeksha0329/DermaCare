# DermaCare ML Model Setup

## Overview
This README explains how to correctly start and connect the ML model backend to your DermaCare application.

## Issue Fixed
The application was showing "model not connected" errors when attempting to generate reports because:
1. The frontend was trying to connect to the ML model on port 7000, but the model was running on port 5000
2. The ML model backend was not running when you uploaded images
3. There were issues with how the diagnosis data was being saved and retrieved
4. The form parameter name in the frontend was "image" but the model expected "file"

## How to Start the ML Model
Before using the image upload and report generation features, make sure the ML model backend is running:

### Windows:
1. Double-click the `start_ml_model.bat` file
2. Wait for the command window to show "Running on http://0.0.0.0:5000"
3. Keep this window open while using DermaCare

### Mac/Linux:
1. Open a terminal in the project root directory
2. Run `chmod +x start_ml_model.sh` to make the script executable
3. Run `./start_ml_model.sh` to start the server
4. Keep this terminal open while using DermaCare

## Testing the Model Server
To verify that the model server is running correctly:
1. Open a web browser and go to: `http://localhost:5000/health`
2. You should see a JSON response confirming the server is running

## Troubleshooting

### If you see "400 BAD REQUEST" errors:
1. Make sure the model server is running
2. Check that you're using the correct form parameter name ("file" instead of "image") in the upload request
3. Verify that the image file being uploaded is a valid image format (jpg, jpeg, png)
4. Look at the model server console output for specific error messages
5. Try a different image file - some image formats might not be compatible

### If "model not connected" still appears:
1. Ensure both the main backend and ML model backend servers are running
2. Restart both servers if needed
3. Check that the model file exists in the `modelBackend/model/` directory
4. Try uploading a different image

### If "unable to generate report" appears:
1. Check the backend logs for errors
2. Ensure your MongoDB database is running
3. Check that Cloudinary is correctly configured for image uploads

## Technical Changes Made
1. Updated the frontend to connect to port 5000 instead of 7000
2. Fixed the parameter name from "image" to "file" in the ML model request
3. Fixed the field names in upload.js to correctly store diagnosis data
4. Added better error handling in the diagnosis process
5. Created a DiagnosisModel for storing diagnosis information
6. Updated the report generation to use the correct field names
7. Added explicit CORS configuration to the model server
8. Added detailed logging to help diagnose problems 