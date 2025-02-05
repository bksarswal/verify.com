import React from "react";
import md from "../DashborNavmain/account-circle-55dp-000000-fill0-wght400-grad0-opsz48-1.png";

function Avatar() {
  return (
    <div
      className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${md})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Add avatar-specific content here if needed */}
    </div>
  );
};


export default Avatar