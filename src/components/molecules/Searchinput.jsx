import React from "react";
import { Input } from "../ui/input";

export default function SearchInput({
  startIcon,
  endIcon,
  value,
  onChange,
  placeholder = "Search...",
  className,
}) {
  return (
    <div className="relative w-full">
      {/* Start Icon */}
      {startIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {startIcon}
        </div>
      )}

      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-${startIcon ? "10" : "3"} pr-${endIcon ? "10" : "3"} w-full rounded-lg ${className}`}
      />

      {/* End Icon */}
      {endIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {endIcon}
        </div>
      )}
    </div>
  );
}