import React from "react";

const HideIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
    >
      <path d="M5 12.02v.5h14v-1H5v.5" />
    </svg>
  );
};

export default HideIcon;
