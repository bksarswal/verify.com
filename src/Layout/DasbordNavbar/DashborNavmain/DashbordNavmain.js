import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, CircleUserRound  } from "lucide-react";
import { XCircle } from "lucide-react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../Config/firebaseConfig"; // Adjust the import based on your Firebase setup
import accountBalanceWalletIcon from "../DashborNavmain/account-balance-wallet-55dp-000000-fill0-wght400-grad0-opsz48-1.png";
import logoImage from "../DashborNavmain/imadsdge-1.png";

function DashbordNavbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation(); // Get current route location

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch the email
        setUserEmail(user.email);
      } else {
        // User is signed out
        setUserEmail("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get the first two letters of the email
  const getInitials = (email) => {
    if (!email) return "";
    const parts = email.split("@");
    const username = parts[0];
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 mx-auto flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        {/* Logo and Brand Name */}
        <Link to="/dashboard">
          <div className="flex items-center">
            <img
              className="w-[60px] h-[60px] object-cover mr-3 md:mr-4"
              alt="Logo"
              src={logoImage}
            />
            <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-black">
              Verify Earn
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <div className="flex items-center ml-4 lg:ml-10">
            <img
              className="w-6 h-6 md:w-8 md:h-8 object-cover"
              alt="Wallet"
              src={accountBalanceWalletIcon}
            />
            <Link
              to="/dashboard"
              className="text-[16px] md:text-xl font-bold text-[#252525] hover:text-blue-500 ml-2"
            >
              $10.00
            </Link>
          </div>

          <Link
            to="/dashboard"
            className={`text-[16px] md:text-xl font-bold ${
              isActive("/dashboard")
                ? "text-blue-500"
                : "text-[#252525] hover:text-blue-500"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/withdraw"
            className={`text-[16px] md:text-xl font-bold ${
              isActive("/dashboard/withdraw")
                ? "text-blue-500"
                : "text-[#252525] hover:text-blue-500"
            }`}
          >
            Withdraw
          </Link>
          <Link
            to="/dashboard/referral"
            className={`text-[16px] md:text-xl font-bold ${
              isActive("/dashboard/referral")
                ? "text-blue-500"
                : "text-[#252525] hover:text-blue-500"
            }`}
          >
            Referral
          </Link>
          <Link
            to="/dashboard/task-history"
            className={`text-[16px] md:text-xl font-bold ${
              isActive("/dashboard/task-history")
                ? "text-blue-500"
                : "text-[#252525] hover:text-blue-500"
            }`}
          >
            Task History
          </Link>
        </nav>

        {/* Desktop Icons (Notification and Profile) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleNotification}
            className="relative hover:text-blue-500"
          >
            <Bell size={44} />
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                <p className="text-sm text-gray-700">No new notifications</p>
              </div>
            )}
          </button>
          <button  className="hover:text-blue-500 ">
          <Link
            to="/dashboard/profile"
           
          >
            {userEmail ? (
              <div className="w-12 h-12 flex items-center bg-blue-100 justify-center border-4 border-black  rounded-full text-xl  font-bold">
                {getInitials(userEmail)}
              </div>
            ) : (
              <CircleUserRound size={44} />
            )}
          </Link>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-300 transition"
            onClick={toggleMenu}
          >
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-md bg-gray-100 hover:bg-gray-300 transition"
          onClick={toggleMenu}
        >
      <XCircle/> 

        </button>
        <nav className="mt-16 px-4 space-y-4">
          <Link
            to="/dashboard/profile"
            className={`block text-[16px] font-bold ${
              isActive("/dashboard/profile")
                ? "text-blue-500"
                : "text-[#252525] hover:bg-gray-200"
            } p-2 rounded-md transition`}
          >
            Profile
          </Link>
          <Link
            to="/dashboard"
            className={`block text-[16px] font-bold ${
              isActive("/dashboard")
                ? "text-blue-500"
                : "text-[#252525] hover:bg-gray-200"
            } p-2 rounded-md transition`}
          >
            $10.00
          </Link>
          <Link
            to="/dashboard/withdraw"
            className={`block text-[16px] font-bold ${
              isActive("/dashboard/withdraw")
                ? "text-blue-500"
                : "text-[#252525] hover:bg-gray-200"
            } p-2 rounded-md transition`}
          >
            Withdraw
          </Link>
          <Link
            to="/dashboard/referral"
            className={`block text-[16px] font-bold ${
              isActive("/dashboard/referral")
                ? "text-blue-500"
                : "text-[#252525] hover:bg-gray-200"
            } p-2 rounded-md transition`}
          >
            Referral
          </Link>
          <Link
            to="/dashboard/task-history"
            className={`block text-[16px] font-bold ${
              isActive("/dashboard/task-history")
                ? "text-blue-500"
                : "text-[#252525] hover:bg-gray-200"
            } p-2 rounded-md transition`}
          >
            Task History
          </Link>
        </nav>
      </div>
    </>
  );
}

export default DashbordNavbar;