import { useState } from "react";
import { Table, Button, Input, Modal, Form } from "antd";

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState([
    { id: 1, name: "Nguyễn Văn A", disease: "Cảm cúm", date: "2024-03-05" },
    {
      id: 2,
      name: "Trần Thị B",
      disease: "Sốt xuất huyết",
      date: "2024-02-28",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Xử lý tìm kiếm
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Mở modal để thêm/sửa hồ sơ
  const showModal = (record = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record || { name: "", disease: "", date: "" });
    setIsModalVisible(true);
  };

  // Xử lý lưu dữ liệu
  const handleSave = (values) => {
    if (editingRecord) {
      setRecords(
        records.map((record) =>
          record.id === editingRecord.id ? { ...record, ...values } : record
        )
      );
    } else {
      setRecords([...records, { id: records.length + 1, ...values }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý xóa hồ sơ
  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Hồ sơ Y tế</h2>

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
        Thêm Hồ sơ
      </Button>

      <Table
        dataSource={filteredRecords}
        rowKey="id"
        columns={[
          { title: "Tên bệnh nhân", dataIndex: "name", key: "name" },
          { title: "Bệnh lý", dataIndex: "disease", key: "disease" },
          { title: "Ngày khám", dataIndex: "date", key: "date" },
          {
            title: "Hành động",
            key: "actions",
            render: (text, record) => (
              <>
                <Button
                  onClick={() => showModal(record)}
                  style={{ marginRight: 8 }}
                >
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        title={editingRecord ? "Chỉnh sửa hồ sơ" : "Thêm hồ sơ"}
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
          <Form.Item
            name="disease"
            label="Bệnh lý"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày khám" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
