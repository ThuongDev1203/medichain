import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppHeader from "./components/Header"; // Đảm bảo tên file và đường dẫn đúng
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import PatientManagerPage from "./pages/PatientManagerPage";
import SecurityPage from "./pages/SecurityPage";

const { Content } = Layout;

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userAddress"); // Kiểm tra trạng thái đăng nhập
  return isLoggedIn ? children : <Navigate to="/" />; // Chuyển hướng về trang chủ nếu chưa đăng nhập
};

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ flex: 1, marginTop: "64px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/patient-manager"
              element={
                <ProtectedRoute>
                  <PatientManagerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medical-records"
              element={
                <ProtectedRoute>
                  <MedicalRecordsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/security"
              element={
                <ProtectedRoute>
                  <SecurityPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
