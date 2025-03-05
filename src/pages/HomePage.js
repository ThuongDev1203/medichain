import { useState } from "react";
import { Input, Button, Card, List, Typography } from "antd";
import { SearchOutlined, RobotOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Danh sách thuốc mẫu
  const medicineList = [
    { name: "Paracetamol", use: "Giảm đau, hạ sốt" },
    { name: "Ibuprofen", use: "Chống viêm, giảm đau" },
    { name: "Amoxicillin", use: "Kháng sinh điều trị nhiễm trùng" },
    { name: "Cetirizine", use: "Chống dị ứng" },
    { name: "Loperamide", use: "Điều trị tiêu chảy" },
  ];

  // Xử lý tìm kiếm thuốc trong danh sách mẫu
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);

    // Tìm kiếm trong danh sách mẫu
    const foundMedicine = medicineList.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundMedicine.length > 0) {
      setResults(foundMedicine);
      setLoading(false);
    } else {
      // Nếu không có trong danh sách, sử dụng OpenAI API
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "gpt-3.5-turbo",
            prompt: `Tìm kiếm thông tin thuốc: ${searchTerm}`,
            max_tokens: 100,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Thay bằng API key của bạn
            },
          }
        );

        setResults([
          { name: searchTerm, use: response.data.choices[0].text.trim() },
        ]);
      } catch (error) {
        console.error("Lỗi tìm kiếm AI:", error);
        setResults([{ name: searchTerm, use: "Không tìm thấy thông tin." }]);
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        💊 Tư Vấn Y Tế & Tìm Kiếm Thuốc
      </Title>
      <Paragraph style={{ textAlign: "center" }}>
        Nhập tên thuốc để tìm kiếm thông tin nhanh chóng!
      </Paragraph>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          placeholder="Nhập tên thuốc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          style={{ flex: 1 }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          loading={loading}
        >
          Tìm Kiếm
        </Button>
      </div>

      <List
        bordered
        dataSource={results}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ width: "100%" }}>
              <Title level={4}>{item.name}</Title>
              <Paragraph>{item.use}</Paragraph>
            </Card>
          </List.Item>
        )}
      />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <RobotOutlined style={{ fontSize: "50px", color: "#1890ff" }} />
        <Paragraph>
          <strong>AI Hỗ trợ tìm kiếm thuốc và tư vấn sức khỏe!</strong>
        </Paragraph>
      </div>
    </div>
  );
}
