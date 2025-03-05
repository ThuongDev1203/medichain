import { useState } from "react";
import { Input, Button, Card, List, Typography } from "antd";
import { SearchOutlined, RobotOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const medicineList = [
    { name: "Paracetamol", use: "Giảm đau, hạ sốt" },
    { name: "Ibuprofen", use: "Chống viêm, giảm đau" },
    { name: "Amoxicillin", use: "Kháng sinh điều trị nhiễm trùng" },
    { name: "Cetirizine", use: "Chống dị ứng" },
    { name: "Loperamide", use: "Điều trị tiêu chảy" },
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);

    const foundMedicine = medicineList.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundMedicine.length > 0) {
      setResults(foundMedicine);
      setLoading(false);
    } else {
      try {
        const response = await axios.get(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}&limit=1`
        );

        if (response.data.results && response.data.results.length > 0) {
          const drug = response.data.results[0];
          const drugInfo = {
            name: drug.openfda.brand_name?.[0] || searchTerm,
            use:
              drug.indications_and_usage?.[0] || "Không có thông tin chi tiết.",
          };
          setResults([drugInfo]);
        } else {
          setResults([{ name: searchTerm, use: "Không tìm thấy thông tin." }]);
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm từ OpenFDA API:", error);
        setResults([{ name: searchTerm, use: "Không tìm thấy thông tin." }]);
      }
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          style={{
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "20px",
            backgroundColor: "#FFEFD5",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <motion.img
            src="/logoweb.png"
            alt="Logo Website"
            style={{
              width: "150px",
              height: "auto",
              display: "block",
              margin: "0 auto 20px auto",
            }}
            whileHover={{ scale: 1.05 }}
          />
          <Title level={2} style={{ color: "#1890ff" }}>
            🏥 TỐI ƯU HOÁ HỆ THỐNG QUẢN LÝ HỒ SƠ BỆNH NHÂN BẰNG BLOCKCHAIN
          </Title>
          <Paragraph style={{ fontSize: "16px", color: "#555" }}>
            Ứng dụng công nghệ Blockchain để đảm bảo tính bảo mật, minh bạch và
            hiệu quả trong quản lý hồ sơ bệnh nhân.
          </Paragraph>
        </Card>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          style={{
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "rgba(170, 250, 250, 0.1)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={2} style={{ marginTop: "10px" }}>
            💊 Tư Vấn Y Tế & Tìm Kiếm Thuốc
          </Title>
          <Paragraph style={{ fontSize: "16px", color: "#555" }}>
            Hệ thống hỗ trợ tra cứu thông tin thuốc một cách nhanh chóng, giúp
            bạn hiểu rõ công dụng và cách sử dụng thuốc an toàn.
          </Paragraph>
          <img
            src="/healthcare.png"
            alt="Medicine Icon"
            style={{
              width: "100px",
              height: "auto",
              display: "block",
              margin: "20px auto",
            }}
          />

          <div style={{ margin: "20px auto" }}>
            <Input
              placeholder="Nhập tên thuốc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: "70%", borderRadius: "5px" }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
              style={{ marginLeft: "10px", borderRadius: "5px" }}
            >
              Tìm Kiếm
            </Button>
          </div>

          {/* Danh sách kết quả */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <List
              bordered
              dataSource={results}
              renderItem={(item) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <List.Item>
                    <Card
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        backgroundColor: "#FFEFD5",
                      }}
                      hoverable
                    >
                      <Title level={4}>{item.name}</Title>
                      <Paragraph>{item.use}</Paragraph>
                    </Card>
                  </List.Item>
                </motion.div>
              )}
            />
          </motion.div>

          {/* AI hỗ trợ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: "30px" }}
          >
            <RobotOutlined style={{ fontSize: "50px", color: "#1890ff" }} />
            <Paragraph
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              AI hỗ trợ tìm kiếm thuốc và tư vấn sức khỏe!
            </Paragraph>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
