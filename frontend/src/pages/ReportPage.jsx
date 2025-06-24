import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { Box, Button, Typography } from "@mui/material";
import UserDetails from "../Components/UserDetails";
import Divider from "@mui/material/Divider";
import ReportContents from "../Components/ReportContents";
import Chatbot from "../Components/Chatbot";
import ChatIcon from "@mui/icons-material/Chat";

function ReportPage() {
  const params = useParams();
  const index = params.id;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the PDF data from your API
    const fetchPdfData = async () => {
      if (!token) return;
      try {
        const config = {
          headers: {
            token, // Replace 'your_token_value_here' with the actual token value you want to send.
          },
          timeout: 10000,
        };
        const res = await axios.get(
          `http://localhost:5000/api/generate-pdf?index=${index}`,
          config
        );
        const d = await res.data;
        setData(d);
      } catch (error) {
        setError("Error generating pdf");
        console.error("Error fetching PDF data:", error);
      }
    };

    fetchPdfData();
  }, [token]);

  if (error)
    return <h1 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h1>;

  if (!data) return <Loader message={"Fetching report..."} />;

  return (
    <Box
      sx={{
        margin: "4rem",
        borderRadius: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        paddingBottom: 2,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          margin: "2rem",
          padding: "2rem",
          fontFamily: "montserrat",
        }}
      >
        Your Report
      </h1>
      {data.pdf && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <UserDetails />
          <Divider sx={{ width: 0.8, marginTop: 2, marginBottom: 2 }} />
          <ReportContents
            diseaseName={data.diseaseName}
            imageUrl={data.imageUrl}
            diseaseInfoResponse={data.diseaseInfoResponse}
            medicinesResponse={data.medicinesResponse}
            pdfData={data.pdf}
            emailUrl={`http://localhost:5000/api/generate-pdf?index=${index}&needEmail=1`}
          />
          
          {/* Add AI Chatbot */}
          <Box 
            sx={{ 
              width: "75%", 
              mt: 4, 
              p: 3, 
              bgcolor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              border: "1px solid rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
              textAlign: "center"
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Have Questions About Your Diagnosis?
            </Typography>
            <Typography variant="body1" mb={3}>
              Chat with our AI assistant for more information about your condition, treatment options, or general skin health questions.
            </Typography>
          </Box>
          
          {/* Add the Chatbot component with the diagnosis information */}
          <Chatbot 
            diagnosisId={index} 
            diagnosisText={`Disease: ${data.diseaseName}\n${data.diseaseInfoResponse}`} 
          />
        </Box>
      )}
    </Box>
  );
}

export default ReportPage;
