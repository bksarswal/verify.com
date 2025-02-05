import PropTypes from "prop-types";
import React from "react";

export const TextField = ({ variant, className }) => {
  return <div className={`w-[68px] h-[23px] bg-[#252525] ${className}`} />;
};

TextField.propTypes = {
  variant: PropTypes.oneOf(["standard"]),
};
