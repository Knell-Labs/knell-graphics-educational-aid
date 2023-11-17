// generic button

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  ...props
}) => {
  let baseClasses =
    "font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition";

  let colorClasses: string;
  let sizeClasses: string;

  switch (variant) {
    case "primary":
      colorClasses = "bg-indigo-600 hover:bg-indigo-700 text-white";
      break;
    case "secondary":
      colorClasses = "bg-gray-300 hover:bg-gray-400 text-gray-800";
      break;
    case "outline":
      colorClasses =
        "border border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600";
      break;
    case "disabled":
      colorClasses = "bg-gray-300 text-gray-500 cursor-not-allowed";
      break;
    default:
      colorClasses = "bg-indigo-600 hover:bg-indigo-700 text-white";
      break;
  }

  switch (size) {
    case "small":
      sizeClasses = "py-1 px-3 text-sm";
      break;
    case "medium":
      sizeClasses = "py-2 px-4 text-md";
      break;
    case "large":
      sizeClasses = "py-3 px-6 text-lg";
      break;
    default:
      sizeClasses = "py-2 px-4 text-md";
      break;
  }

  const fullWidthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      {...props}
      className={`${baseClasses} ${colorClasses} ${sizeClasses} ${fullWidthClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
