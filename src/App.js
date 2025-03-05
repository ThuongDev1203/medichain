import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ flex: "1", marginTop: "64px" }}></Content>
      <Footer />
    </Layout>
  );
}

export default App;
