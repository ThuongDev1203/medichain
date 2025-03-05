import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isModalOpen, handleCancel, colors, setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Nhập địa chỉ hợp đồng thực
  const contractAddress = "0xYourActualContractAddress"; // ⚠️ Cập nhật địa chỉ hợp đồng thực tế
  const contractABI = [
    {
      inputs: [{ internalType: "string", name: "_role", type: "string" }],
      name: "registerUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getUserRole",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "loginUser",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  // 🔹 Hàm kết nối Metamask
  const connectWallet = async () => {
    if (!window.ethereum) {
      message.error("Vui lòng cài đặt Metamask!");
      throw new Error("Metamask not installed");
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return { provider, signer };
    } catch (error) {
      console.error("Lỗi kết nối Metamask:", error);
      message.error("Không thể kết nối Metamask!");
      throw error;
    }
  };

  // 🔹 Hàm Đăng ký
  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const { signer } = await connectWallet();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.registerUser(values.role);
      await tx.wait();

      const address = await signer.getAddress();
      message.success(`Đăng ký thành công! Địa chỉ: ${address}`);
      setIsRegister(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      message.error("Đăng ký thất bại! Vui lòng thử lại.");
    }
    setLoading(false);
  };

  // 🔹 Hàm Đăng nhập
  const handleLogin = async () => {
    setLoading(true);
    console.log("Bắt đầu đăng nhập...");

    try {
      const { signer } = await connectWallet();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Kiểm tra địa chỉ ví
      const signerAddress = await signer.getAddress();
      console.log("Địa chỉ người dùng:", signerAddress);

      // Kiểm tra trạng thái đăng nhập từ hợp đồng
      const isValid = await contract.loginUser();
      console.log("Kết quả từ loginUser:", isValid);

      if (isValid) {
        localStorage.setItem("userAddress", signerAddress);
        setIsLoggedIn(true);
        message.success(`Đăng nhập thành công! Địa chỉ: ${signerAddress}`);
        handleCancel();
        navigate("/patient-manager");
      } else {
        message.warning("Bạn chưa đăng ký trên hệ thống!");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập:", error);
      message.error("Đã xảy ra lỗi khi đăng nhập! Vui lòng thử lại.");
    }
    setLoading(false);
  };

  // 🔹 Xử lý khi nhấn nút
  const onFinish = (values) => {
    if (isRegister) {
      handleRegister(values);
    } else {
      handleLogin();
    }
  };

  return (
    <Modal
      title={
        isRegister
          ? "Đăng Ký Tài Khoản Blockchain"
          : "Đăng Nhập Bằng Blockchain"
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {isRegister && (
          <Form.Item
            label="Vai Trò"
            name="role"
            rules={[{ required: true, message: "Chọn vai trò của bạn" }]}
          >
            <Input
              prefix={<MedicineBoxOutlined style={{ color: colors.accent }} />}
              placeholder="Bác sĩ / Nhân viên y tế / Bệnh nhân"
            />
          </Form.Item>
        )}
        <Button
          type="primary"
          block
          htmlType="submit"
          loading={loading}
          style={{
            marginTop: "10px",
            background: colors.primary,
            border: "none",
          }}
        >
          {isRegister ? "Đăng Ký Qua Metamask" : "Đăng Nhập Qua Metamask"}
        </Button>
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            cursor: "pointer",
            color: colors.dark,
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Đã có tài khoản? Đăng nhập"
            : "Chưa có tài khoản? Đăng ký"}
        </p>
      </Form>
      <p style={{ textAlign: "center", color: colors.dark, marginTop: "10px" }}>
        Đảm bảo bạn đã cài Metamask và kết nối ví Blockchain!
      </p>
    </Modal>
  );
};

export default AuthModal;
