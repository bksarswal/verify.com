import { useState } from "react";

export default function ReferralPage() {
  const referralLink = "https://verify-com.onrender.com/";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Refer & Earn</h1>
      <p className="mb-2 text-gray-700">Share this referral link with your friends:</p>
      <div className="flex items-center border border-gray-300 p-2 rounded-lg bg-white">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="p-2 outline-none w-full bg-transparent"
        />
        <button
          onClick={copyToClipboard}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
