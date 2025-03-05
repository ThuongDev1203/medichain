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

  const contractAddress = "0xYourRealContractAddress"; // Thay bằng địa chỉ thật
  const contractABI = [
    // ABI từ Remix sau khi deploy hợp đồng mới
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

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return { provider, signer };
      } catch (error) {
        console.error("Lỗi kết nối Metamask:", error);
        message.error("Không thể kết nối ví Metamask!");
        throw error;
      }
    } else {
      message.error("Vui lòng cài đặt Metamask!");
      throw new Error("Metamask not installed");
    }
  };

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
      message.error("Đăng ký thất bại!");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    console.log("Bắt đầu đăng nhập...");
    try {
      const { signer } = await connectWallet();
      console.log("Đã kết nối Metamask");
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("Đã tạo instance hợp đồng:", contractAddress);

      // Kiểm tra trước khi gọi loginUser
      const signerAddress = await signer.getAddress();
      console.log("Địa chỉ người dùng:", signerAddress);

      const isValid = await contract.loginUser();
      console.log("Kết quả từ loginUser:", isValid);

      if (isValid) {
        localStorage.setItem("userAddress", signerAddress);
        console.log("Đã lưu userAddress:", localStorage.getItem("userAddress"));
        setIsLoggedIn(true);
        console.log("Đã gọi setIsLoggedIn(true)");
        message.success(`Đăng nhập thành công! Địa chỉ: ${signerAddress}`);
        handleCancel();
        navigate("/patient-manager");
        console.log("Đã chuyển hướng đến /patient-manager");
      } else {
        message.error("Bạn chưa đăng ký trên hệ thống!");
        console.log("Người dùng chưa đăng ký trên smart contract");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập:", error);
      if (error.code === "CALL_EXCEPTION" && error.reason) {
        message.error(`Lỗi từ hợp đồng: ${error.reason}`);
      } else {
        message.error("Đã xảy ra lỗi khi đăng nhập!");
      }
    }
    setLoading(false);
  };

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
