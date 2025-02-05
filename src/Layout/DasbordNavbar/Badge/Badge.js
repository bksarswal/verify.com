import React from "react";
import PropTypes from "prop-types";
import mn from "../DashborNavmain/notification-bell-1.png"; // Path to your image

function Badge (){
  return (
    <div
      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${mn})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Add badge-specific content here if needed */}
    </div>
  );
};

// Prop validation
Badge.propTypes = {
  badgeVariant: PropTypes.string, // Variant styling if needed
  className: PropTypes.string,    // Additional classes
};

// Default props (if any)
Badge.defaultProps = {
  badgeVariant: "default", // Set default value if needed
};

export default Badge
