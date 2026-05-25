import React from "react";
import ErrorText from "../text/error-text";

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function SelectInput({
  label,
  error,
  touched,
  icon,
  children,
  className = "",
  id,
  name,
  ...props
}: SelectInputProps) {
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
        <select
          id={inputId}
          name={name}
          className={`w-full py-2.5 rounded-xl border bg-white text-gray-800 text-sm appearance-none transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-150/20 ${
            icon ? "pl-10 pr-10" : "pl-4 pr-10"
          } ${
            hasError
              ? "border-rose-350 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-gray-250 hover:border-gray-300 focus:border-indigo-500"
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {hasError && <ErrorText message={error} />}
    </div>
  );
}
