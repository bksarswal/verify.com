import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../Assetss/imadsdge.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            className="w-[50px] h-[50px] object-cover"
            alt="Logo"
          />
          <span className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold text-black font-poppins">
            Verify Earn
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/home"
            className={`text-[16px] lg:text-[20px] font-bold font-poppins transition-colors ${
              isActive("/home")
                ? "text-[#2196F3] "
                : "text-[#252525] hover:text-[#2196F3] "
            }`}
          >
            Home
          </Link>
          <Link
            to="/howitsworks"
            className={`text-[16px] lg:text-[20px] font-bold font-poppins transition-colors ${
              isActive("/howitsworks")
                ? "text-[#2196F3] "
                : "text-[#252525] hover:text-[#2196F3] "
            }`}
          >
            How it&apos;s Work
          </Link>
          <Link
            to="/about"
            className={`text-[16px] lg:text-[20px] font-bold font-poppins transition-colors ${
              isActive("/about")
                ? "text-[#2196F3] "
                : "text-[#252525] hover:text-[#2196F3] "
            }`}
          >
            About Us
          </Link>
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
          <button
            className="text-[#252525] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-b  text-white shadow-lg z-50 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex  bg-[#96f5f5]  min-h-lvh flex-col space-y-6 p-6">
              <Link
                to="/"
                className={`text-[18px] font-bold font-poppins transition-colors ${
                  isActive("/")
                    ? "text-[#2196F3]"
                    : "text-white hover:text-[#2196F3]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={`text-[18px] font-bold font-poppins transition-colors ${
                  isActive("/how-it-works")
                    ? "text-[#2196F3]"
                    : "text-white hover:text-[#2196F3]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                How it&apos;s Work
              </Link>
              <Link
                to="/about"
                className={`text-[18px] font-bold font-poppins transition-colors ${
                  isActive("/about")
                    ? "text-[#2196F3]"
                    : "text-white hover:text-[#2196F3]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <button
                className="bg-white text-[#2196F3] hover:bg-gray-100 rounded-full px-6 py-2 font-semibold"
                onClick={() => {
                  navigate("/signin");
                  setIsMenuOpen(false);
                }}
              >
                Sign in
              </button>
              <button
                className="bg-white text-[#2196F3] hover:bg-gray-100 rounded-full px-6 py-2 font-semibold"
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}