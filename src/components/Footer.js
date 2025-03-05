import { Layout } from "antd";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#001529",
        color: "white",
        padding: "20px 0",
      }}
    >
      MediChain ©{new Date().getFullYear()} Created by VT Game Studio
    </Footer>
  );
}
