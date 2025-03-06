import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Dropdown, message, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  DatabaseOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
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
  const [menuVisible, setMenuVisible] = useState(false);

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
      label: <Link to="/">Trang Chủ</Link>,
    },
    ...(userAddress
      ? [
          {
            key: "patients",
            icon: <UserOutlined style={{ color: colors.primary }} />,
            label: <Link to="/patient-manager">Bệnh Nhân</Link>,
          },
          {
            key: "records",
            icon: <DatabaseOutlined style={{ color: colors.primary }} />,
            label: <Link to="/medical-records">Hồ Sơ Y Tế</Link>,
          },
          {
            key: "security",
            icon: <LockOutlined style={{ color: colors.primary }} />,
            label: <Link to="/security">Bảo Mật</Link>,
          },
        ]
      : []),
  ];

  const mobileMenu = (
    <Menu style={{ minWidth: "180px" }} onClick={() => setMenuVisible(false)}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Trang Chủ</Link>
      </Menu.Item>
      {userAddress ? (
        <>
          <Menu.Item key="patients" icon={<UserOutlined />}>
            <Link to="/patient-manager">Bệnh Nhân</Link>
          </Menu.Item>
          <Menu.Item key="records" icon={<DatabaseOutlined />}>
            <Link to="/medical-records">Hồ Sơ Y Tế</Link>
          </Menu.Item>
          <Menu.Item key="security" icon={<LockOutlined />}>
            <Link to="/security">Bảo Mật</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng Xuất
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" icon={<UserOutlined />} onClick={showModal}>
          Đăng Nhập
        </Menu.Item>
      )}
    </Menu>
  );

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
      {!isMobile ? (
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
      ) : (
        <Dropdown
          overlay={mobileMenu}
          trigger={["click"]}
          visible={menuVisible}
          onVisibleChange={(flag) => setMenuVisible(flag)}
        >
          <Button type="text" icon={<MenuOutlined />} size="large" />
        </Dropdown>
      )}

      {/* Hiển thị địa chỉ ví & nút đăng nhập/đăng xuất */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {userAddress ? (
            <>
              <Button shape="round" type="default">
                <UserOutlined style={{ marginRight: 8 }} />
                <Text style={{ fontSize: "12px" }}>
                  {userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
                </Text>
              </Button>
              <Button
                type="default"
                shape="round"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Đăng Xuất
              </Button>
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
      )}

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
