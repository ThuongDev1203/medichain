import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, message, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  DatabaseOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import AuthModal from "./AuthModal";

const { Header } = Layout;
const { Text } = Typography;

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress") || null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colors = {
    primary: "#FF9800",
    dark: "#212121",
    light: "#FAFAFA",
    accent: "#FFC107",
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setUserAddress(null);
    message.success("Đã đăng xuất!");
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined style={{ color: colors.primary }} />,
      label: (
        <Link to="/" style={{ color: colors.dark, fontWeight: "600" }}>
          Trang Chủ
        </Link>
      ),
    },
    ...(userAddress
      ? [
          {
            key: "patients",
            icon: <UserOutlined style={{ color: colors.primary }} />,
            label: (
              <Link
                to="/patient-manager"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Bệnh Nhân
              </Link>
            ),
          },
          {
            key: "records",
            icon: <DatabaseOutlined style={{ color: colors.primary }} />,
            label: (
              <Link
                to="/medical-records"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Hồ Sơ Y Tế
              </Link>
            ),
          },
          {
            key: "security",
            icon: <LockOutlined style={{ color: colors.primary }} />,
            label: (
              <Link
                to="/security"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Bảo Mật
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <Header
      style={{
        background: colors.light,
        padding: "0 20px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Logo */}
      <motion.div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        whileHover={{ scale: 1.1 }}
      >
        <img
          src="/logoweb.png"
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <motion.h1
          style={{
            color: colors.primary,
            fontSize: "26px",
            fontWeight: "bold",
            margin: 0,
            fontFamily: "MuseoModerno, sans-serif",
          }}
          whileHover={{ color: colors.accent }}
        >
          MediChain
        </motion.h1>
      </motion.div>

      {/* Menu */}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{
          background: "transparent",
          borderBottom: "none",
          flex: 1,
          justifyContent: "center",
          display: "flex",
          gap: "30px",
        }}
        items={menuItems}
      />

      {/* Hiển thị địa chỉ ví & nút đăng nhập/đăng xuất */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {userAddress ? (
          <>
            <Button shape="round" type="default">
              <UserOutlined style={{ marginRight: 8 }} />
              <Text style={{ fontSize: "12px" }}>
                {userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
              </Text>
            </Button>
            {!isMobile && (
              <Button
                type="default"
                shape="round"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Đăng Xuất
              </Button>
            )}
          </>
        ) : (
          <Button
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            style={{
              background: colors.primary,
              border: "none",
              fontWeight: "600",
            }}
            onClick={showModal}
          >
            Đăng Nhập
          </Button>
        )}
      </div>

      {/* Modal đăng nhập */}
      <AuthModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setIsLoggedIn={(status) => {
          if (status) {
            const savedAddress = localStorage.getItem("userAddress");
            setUserAddress(savedAddress);
          }
        }}
      />
    </Header>
  );
}
