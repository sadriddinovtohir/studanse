import React from "react";

export default function CustomIcon({
  className,
  icon: Icon,
  title = "Title",
  titlesize,
  iconColor = "text-iconsColor",
  iconsize = 30,
  font,
  titleColor,
}) {
  const defaultIconBox =
    "w-[45px] h-[45px] bg-titleBgColor border-2 border-iconsColor flex justify-center items-center rounded-[30%]";

  return (
    <div className="mt-4 mb-3 flex items-center gap-3">
      <div className={`${defaultIconBox} ${className || ""}`}>
        {Icon && <Icon size={iconsize} className={iconColor} />}
      </div>

      <h1
        className={`text-textColor ${titleColor}`}
        style={{ fontSize: titlesize ? `${titlesize}px` : "30px", fontWeight: `${font}` }}
      >
        {title}
      </h1>
    </div>
  );
}
