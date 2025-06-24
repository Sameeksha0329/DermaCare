import "./App.css";
import "./styles/global.css";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./pages/UploadImage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ReportPage from "./pages/ReportPage";
import DiseasePage from "./pages/DiseasePage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app-parent">
          {/* Background Pattern */}
          <div className="bg-pattern"></div>
          
          {/* Animated Gradient Blobs */}
          <div className="gradient-bg">
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>
            <div className="gradient-blob blob-4"></div>
          </div>
          
          <AuthProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/image" element={<UploadImage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/report/:id" element={<ReportPage />} />
                <Route path="/disease-search" element={<DiseasePage />}></Route>
              </Routes>
            </Router>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
