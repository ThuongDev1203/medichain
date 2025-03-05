import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PatientProfile from "./pages/PatientProfile";
import SettingsPage from "./pages/SettingsPage";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ flex: 1, marginTop: "64px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<PatientProfile />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
