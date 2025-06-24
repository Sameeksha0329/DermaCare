import getDiagnosis from "../openaiHandler.js";
import DiagnosisModel from "../DB/diagnosisModel.js";
import { User } from "../DB/userSchema.js";

async function diagnosis(req, res) {
  try {
    // Get userId from the authenticated request
    const userId = req.userId;
    
    // Check if disease name was provided in the request
    const diseaseName = req.body.diseaseName || "No disease detected";
    
    // List of prompts to send to the diagnosis model
    const prompts = [
      `Provide 5 key points about ${diseaseName}.`,
      `List 5 medicines commonly used to treat ${diseaseName}.`,
      `Outline 5 preventive measures against ${diseaseName}.`,
      `Share 5 effective home remedies for ${diseaseName}.`,
    ];

    // Array to store the responses
    const responses = [];

    // Call the getDiagnosis function for each prompt
    for (const prompt of prompts) {
      const diagnosis = await getDiagnosis(prompt);
      responses.push(diagnosis);
      console.log(diagnosis);
    }

    // Response object with the collected responses
    const response = {
      "Key Points": responses[0],
      "Common Medicines": responses[1],
      "Preventive Measures": responses[2],
      "Home Remedies": responses[3],
    };

    // Save the diagnosis to our DiagnosisModel for later use with the chatbot
    try {
      // Check if the user has any uploaded images, just in case we need to reference the image
      const user = await User.findById(userId);
      let imageUrl = "";
      
      if (user && user.uploadedImages && user.uploadedImages.length > 0) {
        // Use the most recent image
        imageUrl = user.uploadedImages[user.uploadedImages.length - 1].imageUrl;
      }
      
      // Create a new diagnosis document
      const diagnosisDoc = new DiagnosisModel({
        userId: userId,
        imageUrl: imageUrl,
        diseaseName: diseaseName,
        result: JSON.stringify(response),
        diseaseInfoResponse: responses[0],
        medicinesResponse: responses[1],
      });
      
      // Save the diagnosis
      const savedDiagnosis = await diagnosisDoc.save();
      
      // Add the diagnosis ID to the user's diagnoses array
      await User.findByIdAndUpdate(userId, {
        $push: { diagnoses: savedDiagnosis._id }
      });
      
      console.log("New diagnosis saved with ID:", savedDiagnosis._id);
    } catch (error) {
      console.error("Error saving diagnosis:", error);
      // Continue even if there's an error saving the diagnosis
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
}

export { diagnosis };