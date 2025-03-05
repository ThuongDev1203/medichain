import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 mt-16"></main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
