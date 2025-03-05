import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Modal, Form, Input } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  LockOutlined,
  DatabaseOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { Header } = Layout;

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // Color Palette
  const colors = {
    primary: "#FF9800", // Orange
    secondary: "#4CAF50", // Green
    dark: "#212121", // Dark gray
    light: "#FAFAFA", // Light gray
    accent: "#FFC107", // Amber
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showModal = (register) => {
    setIsRegister(register);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

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
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
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
          }}
          whileHover={{ color: colors.accent }}
        >
          MediChain
        </motion.h1>
      </motion.div>

      {/* Desktop Menu */}
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
          >
            <Menu.Item
              key="1"
              icon={<HomeOutlined style={{ color: colors.primary }} />}
            >
              <Link to="/" style={{ color: colors.dark, fontWeight: "600" }}>
                Trang Chủ
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UserOutlined style={{ color: colors.primary }} />}
            >
              <Link
                to="/patient-manager"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Bệnh Nhân
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<DatabaseOutlined style={{ color: colors.primary }} />}
            >
              <Link
                to="/medical-records"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Hồ Sơ Y Tế
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<LockOutlined style={{ color: colors.primary }} />}
            >
              <Link
                to="/security"
                style={{ color: colors.dark, fontWeight: "600" }}
              >
                Bảo Mật
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )}

      {/* Đăng nhập */}
      {!isMobile && (
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            style={{
              background: colors.primary,
              border: "none",
              fontWeight: "600",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => showModal(false)}
          >
            Đăng Nhập
          </Button>
        </div>
      )}

      {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <Menu
              mode="vertical"
              selectable={false}
              style={{ background: "transparent" }}
            >
              <Menu.Item
                key="1"
                icon={<HomeOutlined style={{ color: colors.primary }} />}
                onClick={closeMobileMenu}
              >
                <Link to="/home" style={{ color: colors.dark }}>
                  Trang Chủ
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<UserOutlined style={{ color: colors.primary }} />}
                onClick={closeMobileMenu}
              >
                <Link to="/patients" style={{ color: colors.dark }}>
                  Bệnh Nhân
                </Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<DatabaseOutlined style={{ color: colors.accent }} />}
                onClick={closeMobileMenu}
              >
                <Link to="/medical-records" style={{ color: colors.dark }}>
                  Hồ Sơ Y Tế
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<LockOutlined style={{ color: colors.dark }} />}
                onClick={closeMobileMenu}
              >
                <Link to="/security" style={{ color: colors.dark }}>
                  Bảo Mật
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={closeMobileMenu}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  block
                  style={{
                    background: colors.primary,
                    border: "none",
                    fontWeight: "600",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onClick={() => {
                    showModal(false);
                    closeMobileMenu();
                  }}
                >
                  Đăng Nhập
                </Button>
              </Menu.Item>
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Đăng nhập / Đăng ký */}
      <Modal
        title={isRegister ? "Đăng Ký Tài Khoản" : "Đăng Nhập Hệ Thống"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: colors.primary }} />}
              placeholder="Nhập email của bạn"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: colors.dark }} />}
              placeholder="Nhập mật khẩu của bạn"
            />
          </Form.Item>
          {isRegister && (
            <>
              <Form.Item
                label="Vai Trò"
                name="role"
                rules={[{ required: true, message: "Chọn vai trò của bạn" }]}
              >
                <Input
                  prefix={
                    <MedicineBoxOutlined style={{ color: colors.accent }} />
                  }
                  placeholder="Bác sĩ / Nhân viên y tế"
                />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: colors.dark }} />}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            </>
          )}
          <Button
            type="primary"
            block
            style={{
              marginTop: "10px",
              background: colors.primary,
            }}
          >
            {isRegister ? "Đăng Ký" : "Đăng Nhập"}
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
      </Modal>
    </Header>
  );
}
