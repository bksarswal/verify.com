

import { useState } from "react";
import { User, CreditCard, Users, Lock, LifeBuoy, LogOut, UserPlus } from "lucide-react";
import UserInfoForm from "./UserInfoForm";
import AccountDetailsForm from "./AccountDetailsForm";
import SupportSection from "./SupportSection";
import ChangePasswordForm from "./ChangePasswordForm";
import { Link } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
// import ReferralPage from "../Referral/Referral";
import ReferralPageProfile from "./Referral";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: "user-info", label: "User Information", icon: User },
    { id: "account-details", label: "Account Details", icon: CreditCard },
    { id: "payment", label: "Payment Details", icon: CreditCard },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "support", label: "Support/help", icon: LifeBuoy },
  ];

  return (
    <div className="mt-16 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Mobile Sidebar Toggle */}
        <button className="md:hidden p-2 mb-4 flex justify-center bg-blue-500 text-white rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
          
          <UserPlus className="h-6 w-6"  />

        
        </button>
        
        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative min-h-64 w-64 bg-[#F2FAFA]  p-4 rounded-lg shadow-lg transition-transform  ease-in-out  md:block`}
        >
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === item.id ? "bg-blue-500 text-white" : "bg-[#c8f1f1] hover:bg-blue-200"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMenuOpen(false);
                }}
              >
                <item.icon className="mr-2 h-10 w-10" />
                {item.label}
              </button>
            ))}
            <button className="w-full  p-3 bg-red-500 text-white rounded-lg">
             <Link to="/logout" className="flex items-center"> <LogOut className="mr-2 h-5 w-5" />
             Logout</Link>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F2FAFA] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
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
      return <UserInfoForm />;
    case "account-details":
      return <AccountDetailsForm />;
    case "payment":
      return <PaymentDetails/>;
    case "referrals":
      return <ReferralPageProfile/>;
    case "change-password":
      return <ChangePasswordForm />;
    case "support":
      return <SupportSection />;
    default:
      return null;
  }
};

export default UserProfilePage;
