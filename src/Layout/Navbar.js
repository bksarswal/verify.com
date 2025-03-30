import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaCogs, FaBars } from "react-icons/fa";
import logo from "../Assetss/imadsdge.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} className="w-[50px] h-[50px] object-cover" alt="Logo" />
          <span className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold text-black font-poppins">
            Verify Earn
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { to: "/home", label: "Home", icon: <FaHome /> },
            { to: "/howitsworks", label: "How it Works", icon: <FaCogs /> },
            { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`flex items-center space-x-2 text-[16px] lg:text-[20px] font-bold font-poppins transition-colors ${
                isActive(link.to) ? "text-[#2196F3]" : "text-[#252525] hover:text-[#2196F3]"
              }`}
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-[14px] sm:text-[16px] lg:text-[20px] font-semibold font-poppins"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
          <button
            className="bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-[14px] sm:text-[16px] lg:text-[20px] font-semibold font-poppins"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-[#252525] focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}></div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 w-64 h-screen bg-gradient-to-b from-blue-600 to-cyan-500 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="relative flex flex-col h-full space-y-6 p-6 bg-[#a1c5c5] shadow-inner rounded-l-lg">
              
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-3 right-3 text-black hover:text-red-500 transition-all duration-200"
              >
                <IoCloseCircleOutline size={30} />
              </button>

              {/* Navigation Links with Icons */}
              {[
                { to: "/", label: "Home", icon: <FaHome size={18} className="mr-2" /> },
                { to: "/howitsworks", label: "How it Works", icon: <FaCogs size={18} className="mr-2" /> },
                { to: "/about", label: "About Us", icon: <FaInfoCircle size={18} className="mr-2" /> },
                { to: "/signin", label: "Sign In", icon: <FaSignInAlt size={18} className="mr-2" /> },
                { to: "/signup", label: "Sign Up", icon: <FaUserPlus size={18} className="mr-2" /> },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex items-center text-[#2196F3] bg-white px-4 py-2 rounded-md text-center font-semibold shadow-md hover:bg-[#e3f2fd] hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
