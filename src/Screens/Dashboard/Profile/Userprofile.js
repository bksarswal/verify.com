import { useState, useEffect } from "react";
import { User, CreditCard, Users, Lock, LifeBuoy, LogOut, UserPlus } from "lucide-react";
import UserInfoForm from "./UserInfoForm";
import AccountDetailsForm from "./AccountDetailsForm";
import SupportSection from "./SupportSection";
import ChangePasswordForm from "./ChangePasswordForm";
import { Link } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import ReferralPageProfile from "./Referral";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../Config/firebaseConfig"; // Adjust the import based on your Firebase setup

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const [userInitials, setUserInitials] = useState(""); // State to store the initials

  const auth = getAuth(app);

  // Fetch user email and extract the initials
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        const initials = getInitialsFromEmail(user.email); // Extract initials
        setUserInitials(initials);
      } else {
        setUserEmail("");
        setUserInitials("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to extract initials from email
  const getInitialsFromEmail = (email) => {
    const username = email.split("@")[0]; // Get the username part of the email
    const firstLetter = username[0].toUpperCase(); // First letter of username
    const secondLetter = username[1] ? username[1].toUpperCase() : ""; // Second letter of username (if exists)
    return `${firstLetter}${secondLetter}`; // Combine the two letters
  };

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
        <button
          className="md:hidden p-2 mb-4 flex justify-center text-white rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Display user's initials instead of an icon */}
          <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
            {userInitials}
          </div>
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative min-h-64 w-64 bg-[#F2FAFA] p-4 rounded-lg shadow-lg transition-transform ease-in-out md:block`}
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
            <button className="w-full p-3 bg-red-500 text-white rounded-lg">
              <Link to="/logout" className="flex items-center">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Link>
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
      return <PaymentDetails />;
    case "referrals":
      return <ReferralPageProfile />;
    case "change-password":
      return <ChangePasswordForm />;
    case "support":
      return <SupportSection />;
    default:
      return null;
  }
};

export default UserProfilePage;