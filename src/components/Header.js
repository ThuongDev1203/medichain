import { useState, useEffect } from "react";
import { Layout, Menu, Button, Modal, Form, Input } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

const { Header } = Layout;

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

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

  return (
    <Header
      style={{
        background: "white",
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
      <motion.h1
        style={{
          color: "#FF9800",
          cursor: "pointer",
          fontSize: "26px",
          fontWeight: "bold",
          margin: 0,
        }}
        whileHover={{ scale: 1.1, color: "#FFD700" }}
      >
        MediChain
      </motion.h1>

      {/* Desktop Menu (Nằm ngang) */}
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
              gap: "30px", // Khoảng cách giữa các mục menu
            }}
          >
            <Menu.Item key="1" style={{ color: "#212121", fontWeight: "600" }}>
              Trang chủ
            </Menu.Item>
            <Menu.Item key="2" style={{ color: "#212121", fontWeight: "600" }}>
              Hồ sơ
            </Menu.Item>
            <Menu.Item key="3" style={{ color: "#212121", fontWeight: "600" }}>
              Cài đặt
            </Menu.Item>
          </Menu>
        </div>
      )}

      {/* Đăng nhập (Căn bên phải) */}
      {!isMobile && (
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            style={{
              background: "#FF9800",
              border: "none",
              fontWeight: "600",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => showModal(false)}
          >
            Đăng nhập
          </Button>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button type="text" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <CloseOutlined style={{ fontSize: "20px", color: "#FF9800" }} />
          ) : (
            <MenuOutlined style={{ fontSize: "20px", color: "#FF9800" }} />
          )}
        </Button>
      )}

      {/* Mobile Menu (Dropdown) */}
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
              background: "#FFF3E0",
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
                style={{ color: "#212121", fontWeight: "500" }}
              >
                Trang chủ
              </Menu.Item>
              <Menu.Item
                key="2"
                style={{ color: "#212121", fontWeight: "500" }}
              >
                Hồ sơ
              </Menu.Item>
              <Menu.Item
                key="3"
                style={{ color: "#212121", fontWeight: "500" }}
              >
                Cài đặt
              </Menu.Item>
              <Menu.Item key="4">
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  block
                  style={{
                    background: "#FF9800",
                    border: "none",
                    fontWeight: "600",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onClick={() => showModal(false)}
                >
                  Đăng nhập
                </Button>
              </Menu.Item>
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Đăng nhập / Đăng ký */}
      <Modal
        title={isRegister ? "Đăng ký" : "Đăng nhập"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>
          {isRegister && (
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          )}
          <Button type="primary" block style={{ marginTop: "10px" }}>
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </Button>
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              cursor: "pointer",
              color: "#FF9800",
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
