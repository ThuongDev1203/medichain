import { useState } from "react";
import { Table, Button, Input, Modal, Form } from "antd";

export default function PatientManagerPage() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 30,
      gender: "Nam",
      phone: "0123456789",
    },
    { id: 2, name: "Trần Thị B", age: 25, gender: "Nữ", phone: "0987654321" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [form] = Form.useForm();

  // Xử lý tìm kiếm bệnh nhân
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Mở modal để thêm/sửa bệnh nhân
  const showModal = (patient = null) => {
    setEditingPatient(patient);
    form.setFieldsValue(
      patient || { name: "", age: "", gender: "", phone: "" }
    );
    setIsModalVisible(true);
  };

  // Xử lý lưu dữ liệu
  const handleSave = (values) => {
    if (editingPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === editingPatient.id ? { ...patient, ...values } : patient
        )
      );
    } else {
      setPatients([...patients, { id: patients.length + 1, ...values }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý xóa bệnh nhân
  const handleDelete = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Bệnh Nhân</h2>

      <Input
        placeholder="Tìm kiếm bệnh nhân..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginLeft: 10 }}
      >
        Thêm Bệnh Nhân
      </Button>

      <Table
        dataSource={filteredPatients}
        rowKey="id"
        columns={[
          { title: "Tên", dataIndex: "name", key: "name" },
          { title: "Tuổi", dataIndex: "age", key: "age" },
          { title: "Giới tính", dataIndex: "gender", key: "gender" },
          { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
          {
            title: "Hành động",
            key: "actions",
            render: (text, patient) => (
              <>
                <Button
                  onClick={() => showModal(patient)}
                  style={{ marginRight: 8 }}
                >
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(patient.id)}>
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        title={editingPatient ? "Chỉnh sửa bệnh nhân" : "Thêm bệnh nhân"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="name"
            label="Tên bệnh nhân"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
