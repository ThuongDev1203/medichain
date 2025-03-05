import { useState } from "react";
import { Table, Button, Input, Modal, Form, Select } from "antd";

export default function SecurityPage() {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", role: "Admin", email: "admin@example.com" },
    { id: 2, username: "user1", role: "User", email: "user1@example.com" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Lọc danh sách tài khoản theo tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  // Mở modal thêm/sửa người dùng
  const showModal = (user = null) => {
    setEditingUser(user);
    form.setFieldsValue(user || { username: "", role: "User", email: "" });
    setIsModalVisible(true);
  };

  // Lưu dữ liệu khi thêm/sửa người dùng
  const handleSave = (values) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
    } else {
      setUsers([...users, { id: users.length + 1, ...values }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xóa tài khoản người dùng
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Bảo Mật</h2>

      <Input
        placeholder="Tìm kiếm người dùng..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginLeft: 10 }}
      >
        Thêm Người Dùng
      </Button>

      <Table
        dataSource={filteredUsers}
        rowKey="id"
        columns={[
          { title: "Tên đăng nhập", dataIndex: "username", key: "username" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Vai trò", dataIndex: "role", key: "role" },
          {
            title: "Hành động",
            key: "actions",
            render: (text, user) => (
              <>
                <Button
                  onClick={() => showModal(user)}
                  style={{ marginRight: 8 }}
                >
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(user.id)}>
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        title={editingUser ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
