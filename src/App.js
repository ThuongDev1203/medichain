import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import PatientManagerPage from "./pages/PatientManagerPage";
import SecurityPage from "./pages/SecurityPage";
const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ flex: 1, marginTop: "64px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patient-manager" element={<PatientManagerPage />} />
            <Route path="/medical-records" element={<MedicalRecordsPage />} />
            <Route path="/security" element={<SecurityPage />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
