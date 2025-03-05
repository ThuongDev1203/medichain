import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <Title>Chăm Sóc Sức Khỏe Toàn Diện</Title>
        <Subtitle>Hãy bảo vệ sức khỏe của bạn ngay hôm nay!</Subtitle>
        <Description>
          MediChain cung cấp dịch vụ chăm sóc sức khỏe thông minh, giúp bạn theo
          dõi bệnh án, đặt lịch khám và tư vấn y tế một cách dễ dàng.
        </Description>
        <ButtonContainer>
          <StyledButton
            type="primary"
            onClick={() => navigate("/patient-profile")}
          >
            Xem Hồ Sơ Bệnh Nhân
          </StyledButton>
          <StyledButton type="default" onClick={() => navigate("/settings")}>
            Cài Đặt
          </StyledButton>
        </ButtonContainer>
      </Content>
      <Image src="/images/medical-illustration.png" alt="Healthcare" />
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background: #f5faff;
`;

const Content = styled.div`
  max-width: 50%;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #007bff;
`;

const Subtitle = styled.h2`
  font-size: 22px;
  color: #555;
`;

const Description = styled.p`
  font-size: 18px;
  color: #333;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  padding: 10px 20px;
`;

const Image = styled.img`
  width: 40%;
  max-width: 400px;
`;
