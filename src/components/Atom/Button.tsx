import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type:"submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = true,type = "submit" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-md ${disabled ? "cursor-not-allowed bg-gray-300 text-gray-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      type={type}
    >
      {text}
      
    </button>
  );
};

export default Button;
