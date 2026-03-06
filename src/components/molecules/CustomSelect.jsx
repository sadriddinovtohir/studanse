import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomSelect({
  className,
  placeholder,
  selectData = [],
}) {
  return (
    <Select>
      <SelectTrigger className={`w-[180px] text-textColor ${className}`}>
        <SelectValue placeholder={placeholder || "Theme"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectData == ""
            ? "loading.."
            : selectData.map((item, index) => (
                <SelectItem key={index} value={item.value || item.name}>
                  {item.name}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
