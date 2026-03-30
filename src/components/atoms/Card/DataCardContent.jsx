export default function DataCardContent({
  itemTitle,
  itemclass,
  startTime,
  endTime,
  isActive,
}) {
  return (
    <div className="w-full border p-6 rounded-xl flex justify-between">
      <div>
        {itemTitle ? (
          <h3 className="text-textColor text-[20px]">{itemTitle}</h3>
        ) : null}

        {itemclass ? <p className="text-textGrey">{itemclass}</p> : null}
      </div>

      <div>
        {startTime || endTime ? (
          <div className="flex items-center gap-2 text-[#50A2FFFF]">
            <span>{startTime ? startTime : null}</span>
            {startTime && endTime ? <span>-</span> : null}
            <span>{endTime ? endTime : null}</span>
          </div>
        ) : null}

        {isActive ? (
          <div className="flex items-center gap-2">
            <span
              className={`${
                isActive === "ACTIVE"
                  ? "w-2 h-2 bg-[#05DF72FF]"
                  : "w-2 h-2 bg-[#FDC700FF]"
              } rounded-full`}
            ></span>

            <span className="text-textGrey">{isActive}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
