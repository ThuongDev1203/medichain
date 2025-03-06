import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  Upload,
  Switch,
  message,
  Avatar,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { ethers } from "ethers";

const { Title } = Typography;

export default function SecurityPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    avatar: "/user.png",
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Xử lý thay đổi thông tin cá nhân
  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  // Xử lý tải lên ảnh đại diện
  const handleUpload = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const avatarURL = URL.createObjectURL(info.file.originFileObj);
      setUserData({ ...userData, avatar: avatarURL });
      message.success("Ảnh đại diện đã được cập nhật!");
    }
  };

  // Xác thực bằng MetaMask
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
        message.success("Xác thực thành công!");
      }
    } catch (error) {
      message.error("Xác thực thất bại!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        🔒 Bảo Mật Tài Khoản
      </Title>

      <Card title="Thông Tin Cá Nhân" style={{ marginBottom: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar size={100} src={userData.avatar} />
        </div>
        {isEditing ? (
          <>
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
            </Upload>
            <Input
              prefix={<UserOutlined />}
              placeholder="Họ và Tên"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input
              prefix={<SolutionOutlined />}
              placeholder="Chức vụ"
              value={userData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input
              prefix={<HomeOutlined />}
              placeholder="Địa chỉ"
              value={userData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Số Điện Thoại"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="primary"
              block
              style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
              onClick={() => setIsEditing(false)}
            >
              Lưu
            </Button>
          </>
        ) : (
          <>
            <p>
              <b>Họ và Tên:</b> {userData.name}
            </p>
            <p>
              <b>Chức vụ:</b> {userData.role}
            </p>
            <p>
              <b>Địa chỉ:</b> {userData.address}
            </p>
            <p>
              <b>Email:</b> {userData.email}
            </p>
            <p>
              <b>Số điện thoại:</b> {userData.phone}
            </p>
            <Button
              type="primary"
              block
              style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
              onClick={() => setIsEditing(true)}
            >
              Cập nhật thông tin
            </Button>
          </>
        )}
      </Card>

      {/* Xác thực tài khoản */}
      <Card title="Xác Thực Tài Khoản" style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          block
          onClick={handleLoginWithWallet}
          loading={loading}
          style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
        >
          Xác Thực Bằng MetaMask
        </Button>
      </Card>

      {/* Xác thực hai yếu tố (2FA) */}
      <Card title="Xác Thực Hai Yếu Tố (2FA)" style={{ marginBottom: "20px" }}>
        <Switch
          checked={is2FAEnabled}
          onChange={() => setIs2FAEnabled(!is2FAEnabled)}
        />
        <span style={{ marginLeft: "10px" }}>
          {is2FAEnabled ? "Đã bật" : "Đã tắt"}
        </span>
      </Card>
    </div>
  );
}
