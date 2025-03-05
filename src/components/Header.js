import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, message } from "antd"; // Thêm 'message' vào import
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  LockOutlined,
  DatabaseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const { Header } = Layout;

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userAddress")
  );

  const colors = {
    primary: "#FF9800",
    secondary: "#4CAF50",
    dark: "#212121",
    light: "#FAFAFA",
    accent: "#FFC107",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setIsLoggedIn(false);
    message.success("Đã đăng xuất!"); // Dòng này cần 'message' từ antd
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined style={{ color: colors.primary }} />,
      label: (
        <Link to="/" style={{ color: colors.dark, fontWeight: "600" }}>
          Trang Chủ
        </Link>
      ),
    },
    ...(isLoggedIn
      ? [
          {
            key: "2",
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
            key: "3",
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
            key: "4",
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
      <motion.div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        whileHover={{ scale: 1.1 }}
      >
        <img
          src="/logoweb.png"
          alt=""
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

      {!isMobile && (
        <div style={{ flex: 4, display: "flex", justifyContent: "flex-end" }}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{
              background: "transparent",
              borderBottom: "none",
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
            items={menuItems}
          />
        </div>
      )}

      {!isMobile && (
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {isLoggedIn ? (
            <Button
              type="primary"
              shape="round"
              onClick={handleLogout}
              style={{
                background: colors.primary,
                border: "none",
                fontWeight: "600",
              }}
            >
              Đăng Xuất
            </Button>
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

      {isMobile && (
        <Button type="text" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <CloseOutlined
              style={{ fontSize: "20px", color: colors.primary }}
            />
          ) : (
            <MenuOutlined style={{ fontSize: "20px", color: colors.dark }} />
          )}
        </Button>
      )}

      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              background: colors.light,
              padding: "10px 0",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Menu
              mode="vertical"
              selectable={false}
              style={{ background: "transparent" }}
            >
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Menu.Item>
              ))}
              <Menu.Item key="5" onClick={closeMobileMenu}>
                {isLoggedIn ? (
                  <Button
                    type="primary"
                    shape="round"
                    block
                    onClick={handleLogout}
                    style={{ background: colors.primary, border: "none" }}
                  >
                    Đăng Xuất
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    icon={<UserOutlined />}
                    block
                    style={{ background: colors.primary, border: "none" }}
                    onClick={showModal}
                  >
                    Đăng Nhập
                  </Button>
                )}
              </Menu.Item>
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        colors={colors}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Header>
  );
}
