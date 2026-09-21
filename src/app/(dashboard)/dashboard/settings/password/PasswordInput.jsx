"use client";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const PasswordInput = ({
  name,
  onChange,
  placeholder,
  label,
  error,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="ml-0 md:ml-12">
      <label
        htmlFor={name}
        className={`text-sm font-semibold ${error ? "text-red-500" : "text-gray-600"}`}
      >
        {label}
      </label>
      <div className="w-full">
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className={`w-full p-3 border  pr-12 rounded-md focus:outline-none ${error ? "focus:ring focus:ring-red-500 border-red-500" : "focus:ring focus:ring-blue-300 border-gray-300"}`}
            required
          />

          <button
            type="button"
            className="absolute right-4 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={handleClick}
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
