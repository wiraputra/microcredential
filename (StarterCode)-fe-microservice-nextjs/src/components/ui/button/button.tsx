import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  children: React.ReactNode;
}

export default function Button({
  className = "",
  variant = "primary",
  children,
  type = "button",
  ...props
}: IButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-100 hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-200/50",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-100 hover:shadow-md",
    outline: "bg-transparent border border-gray-200 hover:border-gray-300 text-gray-650 hover:text-gray-800 hover:bg-gray-50/50",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
