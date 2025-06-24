# DermaCare ML Model Backend

## Overview
This is the machine learning backend for the DermaCare application, which provides skin disease diagnosis from images. The model is based on DermNet dataset for skin disease classification.

## Setup Instructions

### Prerequisites
- Python 3.8+ installed on your system
- pip package manager
- Virtual environment (recommended)

### Installation

1. **Create a virtual environment**:
   ```bash
   # Windows
   python -m venv myenv
   
   # Mac/Linux
   python3 -m venv myenv
   ```

2. **Activate the virtual environment**:
   ```bash
   # Windows
   myenv\Scripts\activate
   
   # Mac/Linux
   source myenv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create required directories**:
   ```bash
   mkdir -p model uploads
   ```

5. **Prepare model files**:
   The application is designed to work with or without the actual model file. If you want to use the full model:
   - Place your trained model file in the `model` directory as `dermnet_model.h5`
   - Ensure `class_names.txt` is present in the `model` directory with class labels

### Running the Server

The easiest way to run the server is to use the provided scripts:

- **Windows**: Double-click `start_ml_model.bat` in the project root directory
- **Mac/Linux**: Run `./start_ml_model.sh` in the project root directory

Alternatively, you can start it manually:
```bash
cd modelBackend
source myenv/bin/activate  # or myenv\Scripts\activate on Windows
python app.py
```

The server will run on port 5000. You can test it by visiting `http://localhost:5000/health` in your browser.

## API Endpoints

### `/predict` (POST)
Upload an image for diagnosis.

**Parameters**:
- `file`: The image file to analyze (form-data)

**Response**:
```json
{
  "disease": "Disease Name",
  "confidence": 95.5,
  "class_index": 0
}
```

### `/health` (GET)
Check if the server is running.

**Response**:
```json
{
  "status": "ok",
  "message": "Model server is running",
  "model_type": "DermNet model"
}
```

### `/model_info` (GET)
Get information about the loaded model.

**Response**:
```json
{
  "model_type": "DermNet model",
  "classes": ["Class1", "Class2", ...],
  "class_count": 23
}
```

## Troubleshooting

### Model Not Found
If you see "DermNet model not found" messages:
1. The application will fall back to a simple response mode
2. To use the actual ML model, place the trained model file at `model/dermnet_model.h5`

### Connection Issues
If the frontend cannot connect to the model:
1. Make sure the server is running on port 5000
2. Check that CORS is properly configured
3. Verify the frontend is making requests to "http://127.0.0.1:5000/predict"

### Image Processing Errors
If you see image processing errors:
1. Make sure the uploaded image is a valid image file (jpg, jpeg, png)
2. Check that opencv-python is properly installed
3. Try with a different image

## Development

### Changing the Model
To switch to a different model:
1. Place your new model file in the `model` directory
2. Update the `USE_EXISTING_MODEL` flag in `app.py` if needed
3. Make sure the `class_names.txt` matches your model's classes 