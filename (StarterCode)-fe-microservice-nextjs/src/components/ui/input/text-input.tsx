import React from "react";
import ErrorText from "../text/error-text";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
}

export default function TextInput({
  label,
  error,
  touched,
  icon,
  className = "",
  id,
  name,
  ...props
}: TextInputProps) {
  const hasError = touched && error;
  const inputId = id || name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-gray-500 uppercase tracking-wider block"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          name={name}
          className={`w-full py-2.5 rounded-xl border bg-white text-gray-800 text-sm transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-150/20 placeholder-gray-400/80 placeholder:text-sm placeholder:font-normal ${
            icon ? "pl-10 pr-4" : "px-4"
          } ${
            hasError
              ? "border-rose-350 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-gray-250 hover:border-gray-300 focus:border-indigo-500"
          } ${className}`}
          {...props}
        />
      </div>
      {hasError && <ErrorText message={error} />}
    </div>
  );
}
