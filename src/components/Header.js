import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-blue-400 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          MediChain
        </motion.h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <button className="hover:text-blue-400 transition bg-transparent border-none cursor-pointer">
            Trang chủ
          </button>
          <button className="hover:text-blue-400 transition bg-transparent border-none cursor-pointer">
            Hồ sơ
          </button>
          <button className="hover:text-blue-400 transition bg-transparent border-none cursor-pointer">
            Cài đặt
          </button>
        </nav>

        {/* Đăng nhập */}
        <motion.button
          className="hidden md:flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUserCircle size={20} />
          Đăng nhập
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-gray-800 py-4 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer">
            Trang chủ
          </button>
          <button className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer">
            Hồ sơ
          </button>
          <button className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer">
            Cài đặt
          </button>
          <motion.button
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng nhập
          </motion.button>
        </motion.div>
      )}
    </header>
  );
}
