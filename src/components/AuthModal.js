import { useState } from "react";
import { Modal, Button, message, Tabs, Select } from "antd";
import { ethers } from "ethers";
import { WalletOutlined } from "@ant-design/icons"; // Biểu tượng ví

export default function AuthModal({
  isModalOpen,
  handleCancel,
  setIsLoggedIn,
}) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [userRole, setUserRole] = useState(null);

  const handleLoginWithWallet = async () => {
    if (!window.ethereum) {
      message.error("Vui lòng cài đặt MetaMask để sử dụng tính năng này!");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0];

      if (userAddress) {
        localStorage.setItem("userAddress", userAddress);
        localStorage.setItem("userRole", userRole || "Bệnh nhân"); // Mặc định là Bệnh nhân nếu chưa chọn
        setIsLoggedIn(true);
        message.success("Đăng nhập thành công!");
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      message.error("Đăng nhập thất bại!");
    }
    setLoading(false);
  };

  return (
    <Modal
      title="🔐 Đăng nhập & Đăng ký"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400} // Đặt kích thước modal
      bodyStyle={{ padding: "20px" }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={[
          { key: "login", label: "Đăng nhập" },
          { key: "register", label: "Đăng ký" },
        ]}
      />

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <WalletOutlined style={{ fontSize: 48, color: "#FF9800" }} />
        <p style={{ fontSize: "16px", color: "#555", marginTop: 10 }}>
          Kết nối ví để đăng nhập hoặc đăng ký tài khoản
        </p>
      </div>

      {/* Nếu là đăng ký thì hiển thị chọn quyền */}
      {activeTab === "register" && (
        <div style={{ marginTop: 20 }}>
          <label
            style={{ fontSize: "16px", fontWeight: "bold", color: "#555" }}
          >
            Chọn quyền đăng ký:
          </label>
          <Select
            placeholder="Chọn quyền của bạn"
            style={{ width: "100%", marginTop: 10 }}
            onChange={(value) => setUserRole(value)}
          >
            <Select.Option value="Bác sĩ">🩺 Bác sĩ</Select.Option>
            <Select.Option value="Bệnh nhân">👨‍⚕️ Bệnh nhân</Select.Option>
            <Select.Option value="Y tá">💉 Y tá</Select.Option>
          </Select>
        </div>
      )}

      <Button
        type="primary"
        size="large"
        block
        onClick={handleLoginWithWallet}
        loading={loading}
        style={{
          marginTop: 20,
          background: activeTab === "register" ? "#FFC107" : "#FF9800",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "0.3s",
          border: "none",
        }}
        className="login-button"
      >
        <WalletOutlined /> {activeTab === "register" ? "Đăng ký" : "Đăng nhập"}{" "}
        với MetaMask
      </Button>
    </Modal>
  );
}
