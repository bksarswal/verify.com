import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CircleUserRound } from "lucide-react";
import accountBalanceWalletIcon from "../DashborNavmain/account-balance-wallet-55dp-000000-fill0-wght400-grad0-opsz48-1.png";
import logoImage from "../DashborNavmain/imadsdge-1.png";

function DashbordNavbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white py-5 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-white rounded-[50px] border border-black shadow-md">
        <div className="flex items-center">
          <img className="w-[60px] h-[60px] object-cover mr-3 md:mr-4" alt="Logo" src={logoImage} />
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-black">Verify Earn</h1>
        </div>

       

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
        <div className="hidden md:flex items-center ml-4 lg:ml-10">
          <img className="w-6 h-6 md:w-8 md:h-8 object-cover" alt="Wallet" src={accountBalanceWalletIcon} />
          <Link to="/dashboard" className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-blue-500">$10.00</Link>
          {/* <span className="ml-2 text-[16px] md:text-[21px] font-bold"></span> */}
        </div>
          
          <Link to="/dashboard/withdraw" className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-blue-500">Withdraw</Link>
          <Link to="/dashboard/referral" className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-blue-500">Referral</Link>
          <Link to="/dashboard/task-history" className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-blue-500">Task History</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleNotification} className="relative hover:text-blue-500">
            
            
            <Bell size={44} />
          
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                <p className="text-sm text-gray-700">No new notifications</p>
              </div>
            )}
          </button>
          <Link to="/dashboard/profile" className="hover:text-blue-500">
            <CircleUserRound size={44} />
          </Link>
        </div>

        <div className="flex md:hidden items-center">
          <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-300 transition" onClick={toggleMenu}>
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black"></span>
          </button>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <button className="absolute top-4 right-4 p-2 rounded-md bg-gray-100 hover:bg-gray-300 transition" onClick={toggleMenu}>
          <span className="block w-5 h-1 bg-black mb-1 rotate-45 transform origin-center"></span>
          <span className="block w-5 h-1 bg-black -rotate-45 transform origin-center"></span>
        </button>
        <nav className="mt-16 px-4 space-y-4">
          <Link to="/dashboard/profile" className="block text-[16px] font-bold text-[#252525] hover:bg-gray-200 p-2 rounded-md transition">Profile</Link>
          <Link to="/dashboard" className="block text-[16px] font-bold text-[#252525] hover:bg-gray-200 p-2 rounded-md transition">$10.00</Link>
          <Link to="/dashboard/withdraw" className="block text-[16px] font-bold text-[#252525] hover:bg-gray-200 p-2 rounded-md transition">Withdraw</Link>
          <Link to="/dashboard/referral" className="block text-[16px] font-bold text-[#252525] hover:bg-gray-200 p-2 rounded-md transition">Referral</Link>
          <Link to="/dashboard/task-history" className="block text-[16px] font-bold text-[#252525] hover:bg-gray-200 p-2 rounded-md transition">Task History</Link>
        </nav>
      </div>
    </header>
  );
}

export default DashbordNavbar;
