import mongoose from 'mongoose';

// Create a schema for storing diagnosis results
const diagnosisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  diseaseInfoResponse: {
    type: String,
    required: true
  },
  medicinesResponse: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const DiagnosisModel = mongoose.model('Diagnosis', diagnosisSchema);

export default DiagnosisModel; 