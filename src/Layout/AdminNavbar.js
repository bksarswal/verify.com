import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../Assetss/imadsdge.png";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 z-[100] bg-white/90 backdrop-blur-md shadow-lg">
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
          <Link to="/admindashboard/additems" className="text-[16px] lg:text-[20px] text-[#252525] hover:text-gray-700 transition-colors font-bold font-poppins">
            Add Items
          </Link>
          <Link to="/admindashboard/update" className="text-[16px] lg:text-[20px] text-[#252525] hover:text-gray-700 transition-colors font-bold font-poppins">
            Update Items
          </Link>
        </div>

        {/* Desktop Logout Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-red-600 hover:bg-[#1976D2] text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-[14px] sm:text-[16px] lg:text-[20px] font-semibold font-poppins"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-[#252525] focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay with Higher Z-Index */}
          <div className="fixed inset-0 bg-black/70 z-[99]" onClick={() => setIsMenuOpen(false)}></div>

          {/* Sidebar with Full Height */}
          <div className={`fixed top-0 right-0 w-64 h-screen bg-slate-400 text-white shadow-xl z-[100] transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex flex-col space-y-6 p-6">
              <Link to="/admindashboard/additems" className="text-[18px] font-bold font-poppins hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Items
              </Link>
              <Link to="/admindashboard/update" className="text-[18px] font-bold font-poppins hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Update Items
              </Link>
              <button className="bg-red-600 text-white hover:bg-red-700 rounded-full px-6 py-2 font-semibold"
                onClick={() => {
                  navigate("/logout");
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
