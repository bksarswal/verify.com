"use client";

import { useState } from "react";
import { User, CreditCard, Users, Lock, LifeBuoy, LogOut } from "lucide-react";
import UserInfoForm from "./UserInfoForm";
import AccountDetailsForm from "./AccountDetailsForm";
import SupportSection from "./SupportSection";
import ChangePasswordForm from "./ChangePasswordForm";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("user-info");

  const menuItems = [
    { id: "user-info", label: "User Information", icon: User },
    { id: "account-details", label: "Account Details", icon: CreditCard },
    { id: "payment", label: "Payment Details", icon: CreditCard },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "support", label: "Support/help", icon: LifeBuoy },
  ];

  return (
    <div className=" mt-16 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="hidden md:block w-64 bg-[#F2FAFA] p-4 rounded-lg">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center p-2 rounded-lg ${activeTab === item.id ? "bg-blue-500 text-white" : "bg-[#c8f1f1]"}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </button>
            ))}
            <button className="w-full flex items-center p-2 bg-red-500 text-white rounded-lg">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        <div className="md:hidden mb-4">
          <select 
            className="w-full p-2 border rounded-lg" 
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <main className="flex-1 bg-[#F2FAFA] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{menuItems.find((item) => item.id === activeTab)?.label}</h2>
          <p className="text-gray-600">Manage your {activeTab.replace("-", " ")}.</p>
          <div className="mt-4">{renderTabContent(activeTab)}</div>
        </main>
      </div>
    </div>
  );
};

const renderTabContent = (tab) => {
  switch (tab) {
    case "user-info":
      return <UserInfoForm/>;
    case "account-details":
      return <AccountDetailsForm />;
    case "payment":
    //   return <PaymentSection />;
    case "referrals":
    //   return <ReferralSection />;
    case "change-password":
      return <ChangePasswordForm />;
    case "support":
      return <SupportSection />;
    default:
      return null;
  }
};



export default UserProfilePage;
