import React, { useState } from "react";
import Badge from "../Badge/Badge";
import Avatar from "../Avatar/Avatar";
import accountBalanceWalletIcon from "../DashborNavmain/account-balance-wallet-55dp-000000-fill0-wght400-grad0-opsz48-1.png";
import logoImage from "../DashborNavmain/imadsdge-1.png";
import Logout from "../../../Screens/Logout";
import logoutIcon from "./account-balance-wallet-55dp-000000-fill0-wght400-grad0-opsz48-1.png"; // Add your logout icon here
import { Link } from "react-router-dom";

function DashbordNavbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
    <header className="fixed top-0 left-0 w-full bg-white  py-5 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-white rounded-[50px] border border-black shadow-[0px_4px_4px_#00000040]">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            className="w-[60px] h-[60px] object-cover mr-3 md:mr-4"
            alt="Logo"
            src={logoImage}
          />
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-black [text-shadow:0px_4px_4px_#00000040]">
            Verify Earn
          </h1>
        </div>

        {/* Wallet Section */}
        <div className="hidden md:flex items-center ml-4 lg:ml-10">
          <img
            className="w-6 h-6 md:w-8 md:h-8 object-cover"
            alt="Account balance"
            src={accountBalanceWalletIcon}
          />
          <span className="ml-2 text-[16px] md:text-[21px] font-bold ">
            $10.00
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <a
            href="/dashboard"
            className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-gray-700"
          >
            Dashboard
          </a>
          <a
            href="/withdraw"
            className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-gray-700"
          >
            Withdraw
          </a>
          <a
            href="/referral"
            className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-gray-700"
          >
            Referral
          </a>
          <a
            href="/task-history"
            className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-gray-700"
          >
            Task History
          </a>
        </nav>

        {/* Notification and Avatar */}
        <div className="hidden md:flex items-center space-x-4">
          <Badge />
          <a  href="/dashboard/profile"   className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-gray-700"> <Avatar /></a>
          
        </div>

        {/* Logout Button with Icon */}
        {/* <button
         
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
        >

          <Link  to="/logout" className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">
          
          <img
             src={logoutIcon}
            alt="Logout"
            className="w-5 h-5"
          />
          <span>Logout</span>
          
          </Link>
          
        </button> */}

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center">
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            onClick={toggleMenu}
          >
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black"></span>
          </button>
        </div>
      </div>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={toggleMenu}
        >
          <span className="block w-5 h-1 bg-black mb-1 rotate-45 transform origin-center"></span>
          <span className="block w-5 h-1 bg-black -rotate-45 transform origin-center"></span>
        </button>
        <nav className="mt-16 px-4 space-y-4">
          <a
            href="/dashboard"
            className="block text-[16px] font-bold text-[#252525] hover:text-gray-700"
          >
            Dashboard
          </a>
          <a
            href="/withdraw"
            className="block text-[16px] font-bold text-[#252525] hover:text-gray-700"
          >
            Withdraw
          </a>
          <a
            href="/referral"
            className="block text-[16px] font-bold text-[#252525] hover:text-gray-700"
          >
            Referral
          </a>
          <a
            href="/task-history"
            className="block text-[16px] font-bold text-[#252525] hover:text-gray-700"
          >
            Task History
          </a>
        </nav>
      </div>
    </header>
  );
}

export default DashbordNavbar;
