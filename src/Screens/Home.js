import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EarnMony from "../Assetss/Features-To-Consider-When-Buying-Restaurant-POS-in-Saudi-Arabia-01-2048x1365.png";
import CrAccount from "../Assetss/Mask Group.png";
import SlectTAsk from "../Assetss/Mask Group (2).png";
import CashOut from "../Assetss/Mask Group.png";
import MinimumPayout from "./MinimumPayout";
import PaymentMethod from "./PaymentMethod";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const navigate = useNavigate(); // For navigation

  // Function to handle the "Start Earning Now" button click
  const handleStartEarning = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Navigate to Dashboard if logged in
    } else {
      navigate("/signup"); // Navigate to Signup if not logged in
    }
  };

  return (
    <>
      <div className="w-full bg-[#F2FAFA] min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="grid md:grid-cols-2 items-center gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="font-poppins text-[40px] sm:text-[50px] lg:text-[65px] font-bold text-[#252525] leading-snug">
                Are you looking for<br />earning money?
              </h1>
              <p className="font-poppins text-[18px] sm:text-[20px] lg:text-[24px] text-[#252525] font-normal leading-relaxed max-w-md">
                Earn money with these simple steps, all you have to do is sign up and do simple tasks.
              </p>
              <button
                onClick={handleStartEarning}
                className="font-poppins text-[18px] sm:text-[20px] lg:text-[24px] font-semibold bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-3 rounded-lg transition"
              >
                Start Earning Now
              </button>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative">
              <img
                src={EarnMony}
                alt="Earning money illustration showing computer and coins"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Process Cards */}
          <div className="mt-20 grid sm:grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
            {/* Create Account Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-20 h-20 bg-[#EBF5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={CrAccount}
                  alt="Create Account"
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-3 text-[#252525]">
                Create Account
              </h3>
              <p className="text-[#666666] font-poppins text-sm sm:text-base">
                First, you have to create an account here.
              </p>
            </div>

            {/* Complete Task Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-20 h-20 bg-[#EBF5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={SlectTAsk}
                  alt="Complete Task"
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-3 text-[#252525]">
                Complete Your Task
              </h3>
              <p className="text-[#666666] font-poppins text-sm sm:text-base">
                Select tasks, complete them, and earn!
              </p>
            </div>

            {/* Withdraw Earnings Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-20 h-20 bg-[#EBF5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={CashOut}
                  alt="Withdraw Earnings"
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-3 text-[#252525]">
                Withdraw Earnings
              </h3>
              <p className="text-[#666666] font-poppins text-sm sm:text-base">
                Cash out your earnings in just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MinimumPayout />
      <PaymentMethod />
      <div className="relative mt-[30vh]"></div>
    </>
  );
};

export default Home;