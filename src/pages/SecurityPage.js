import { useState } from "react";
import { Input, Button, Card, Typography, Switch, message } from "antd";
import { LockOutlined, KeyOutlined, SafetyOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph } = Typography;

export default function SecurityPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [accessStatus, setAccessStatus] = useState("Chưa xác thực");
  const [loading, setLoading] = useState(false);

  // Giả lập Blockchain API (thay bằng API thực tế trong dự án)
  const blockchainAPI = "http://localhost:3001/blockchain-auth";

  // Xác thực bằng khóa riêng
  const handleLoginWithPrivateKey = async () => {
    if (!privateKey.trim()) {
      message.error("Vui lòng nhập khóa riêng!");
      return;
    }
    setLoading(true);
    try {
      // Giả lập gọi API Blockchain để xác thực
      const response = await axios.post(blockchainAPI, { privateKey });
      if (response.data.success) {
        setAccessStatus("Đã xác thực - Quyền truy cập hồ sơ được cấp");
        message.success("Đăng nhập thành công!");
      } else {
        setAccessStatus("Xác thực thất bại");
        message.error("Khóa riêng không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      setAccessStatus("Lỗi hệ thống");
      message.error("Đã xảy ra lỗi khi xác thực!");
    }
    setLoading(false);
  };

  // Kích hoạt/tắt 2FA
  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    message.info(`Xác thực 2 yếu tố đã ${!is2FAEnabled ? "bật" : "tắt"}`);
  };

  // Lưu khóa riêng (giả lập, thực tế cần mã hóa)
  const savePrivateKey = () => {
    if (!privateKey.trim()) {
      message.error("Vui lòng nhập khóa riêng để lưu!");
      return;
    }
    localStorage.setItem("encryptedPrivateKey", btoa(privateKey)); // Mã hóa đơn giản bằng base64
    message.success("Khóa riêng đã được lưu an toàn!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        🔒 Bảo Mật Tài Khoản
      </Title>
      <Paragraph style={{ textAlign: "center" }}>
        Quản lý bảo mật tài khoản của bạn trong hệ thống Blockchain y tế
      </Paragraph>

      {/* Đăng nhập bằng khóa riêng */}
      <Card title="Đăng Nhập Bằng Khóa Riêng" style={{ marginBottom: "20px" }}>
        <Input
          prefix={<LockOutlined />}
          placeholder="Nhập khóa riêng của bạn (Private Key)"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button
          type="primary"
          icon={<KeyOutlined />}
          onClick={handleLoginWithPrivateKey}
          loading={loading}
          block
        >
          Xác Thực
        </Button>
      </Card>

      {/* Quản lý khóa riêng */}
      <Card title="Quản Lý Khóa Riêng" style={{ marginBottom: "20px" }}>
        <Paragraph>
          Lưu khóa riêng của bạn một cách an toàn (được mã hóa trong hệ thống).
        </Paragraph>
        <Button onClick={savePrivateKey} type="default" block>
          Lưu Khóa Riêng
        </Button>
      </Card>

      {/* Xác thực hai yếu tố */}
      <Card title="Xác Thực Hai Yếu Tố (2FA)" style={{ marginBottom: "20px" }}>
        <Paragraph>
          Bật 2FA để tăng cường bảo mật cho tài khoản của bạn.
        </Paragraph>
        <Switch checked={is2FAEnabled} onChange={toggle2FA} />
        <span style={{ marginLeft: "10px" }}>
          {is2FAEnabled ? "Đã bật" : "Đã tắt"}
        </span>
      </Card>

      {/* Trạng thái quyền truy cập */}
      <Card title="Trạng Thái Quyền Truy Cập">
        <Paragraph>
          <SafetyOutlined /> {accessStatus}
        </Paragraph>
      </Card>

      {/* Thông báo bảo mật */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Paragraph type="warning">
          <strong>Lưu ý:</strong> Không chia sẻ khóa riêng của bạn với bất kỳ
          ai. Hệ thống Blockchain đảm bảo tính bất biến và bảo mật cho hồ sơ
          bệnh nhân.
        </Paragraph>
      </div>
    </div>
  );
}
