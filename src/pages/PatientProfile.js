import React, { useState } from "react";
import styled from "styled-components";

const PatientProfile = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPatients(
        patients.map((patient) =>
          patient.id === formData.id ? formData : patient
        )
      );
      setIsEditing(false);
    } else {
      const newPatient = {
        ...formData,
        id: Date.now().toString(),
      };
      setPatients([...patients, newPatient]);
    }
    setFormData({
      id: "",
      name: "",
      age: "",
      gender: "",
      diagnosis: "",
      phone: "",
    });
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <Container>
      <h2>Hồ Sơ Bệnh Nhân</h2>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Họ và tên"
          required
        />
        <Input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Tuổi"
          required
        />
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </Select>
        <Input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Chẩn đoán"
          required
        />
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          required
        />
        <SubmitButton type="submit">
          {isEditing ? "Cập nhật" : "Thêm"}
        </SubmitButton>
      </Form>

      <PatientList>
        <h3>Danh sách bệnh nhân</h3>
        <Table>
          <thead>
            <tr>
              <Th>STT</Th>
              <Th>Họ tên</Th>
              <Th>Tuổi</Th>
              <Th>Giới tính</Th>
              <Th>Chẩn đoán</Th>
              <Th>Số điện thoại</Th>
              <Th>Hành động</Th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <Tr key={patient.id}>
                <Td>{index + 1}</Td>
                <Td>{patient.name}</Td>
                <Td>{patient.age}</Td>
                <Td>{patient.gender}</Td>
                <Td>{patient.diagnosis}</Td>
                <Td>{patient.phone}</Td>
                <Td>
                  <EditButton onClick={() => handleEdit(patient)}>
                    Sửa
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(patient.id)}>
                    Xóa
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </PatientList>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const PatientList = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const EditButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default PatientProfile;
