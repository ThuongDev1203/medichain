import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate

const AuthModal = ({ isModalOpen, handleCancel, colors, setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook để chuyển hướng

  const contractAddress = "0xYourSmartContractAddress"; // Thay bằng địa chỉ thực
  const contractABI = [
    "function registerUser(string memory role) public",
    "function loginUser() public view returns (bool)",
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return { provider, signer };
      } catch (error) {
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
    try {
      const { signer } = await connectWallet();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const messageToSign = "Xác thực đăng nhập MediChain";
      const signature = await signer.signMessage(messageToSign);
      const recoveredAddress = ethers.utils.verifyMessage(
        messageToSign,
        signature
      );
      const signerAddress = await signer.getAddress();

      console.log("Signer Address:", signerAddress); // Kiểm tra địa chỉ
      console.log("Recovered Address:", recoveredAddress); // Kiểm tra chữ ký

      if (recoveredAddress === signerAddress) {
        const isValid = await contract.loginUser();
        console.log("Is Valid User:", isValid); // Kiểm tra trạng thái trên Blockchain
        if (isValid) {
          localStorage.setItem("userAddress", signerAddress);
          console.log(
            "Stored userAddress:",
            localStorage.getItem("userAddress")
          ); // Kiểm tra localStorage
          setIsLoggedIn(true);
          message.success(`Đăng nhập thành công! Địa chỉ: ${signerAddress}`);
          handleCancel();
          navigate("/patient-manager"); // Chuyển hướng đến trang tài khoản
        } else {
          message.error("Bạn chưa đăng ký trên hệ thống!");
        }
      } else {
        message.error("Chữ ký không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Đã xảy ra lỗi khi đăng nhập!");
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
