export default function DataCard({
  titleIcon: Icon,
  iconclassName,
  iconSize,
  iconblock,
  iconTitle,
  titleSize,
  data = [],
}) {
  return (
    <div className="w-full border-2 border-textGrey p-4 mb-5 rounded-xl bg-transparent">
      <div className="flex items-center gap-4 mb-3">
        {Icon && (
          <div className={iconblock}>
            <Icon className={iconclassName} size={iconSize} />
          </div>
        )}

        {iconTitle && (
          <h2 className="text-textColor" style={{ fontSize: `${titleSize}px` }}>
            {iconTitle}
          </h2>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full border p-3 rounded-xl flex justify-between hover:bg-black/20 transition-colors duration-500 ease-in-out  "
          >
            <div>
              <h3 className="text-textColor text-[20px]">{item?.lessonName}</h3>

              <p className="text-textGrey">{item?.className}</p>
            </div>

            <div>
              {item?.startTime || item.endTime ? (
                <div className="flex items-center gap-2 text-[#50A2FFFF]">
                  <span>{item?.startTime}</span>
                  <span>-</span>
                  <span>{item?.endTime}</span>
                </div>
              ) : null}

              {item?.status ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      item?.status === "ACTIVE"
                        ? "w-2 h-2 bg-[#05DF72FF]"
                        : "w-2 h-2 bg-[#FDC700FF]"
                    } rounded-full`}
                  />

                  <span className="text-textGrey">{item?.status}</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
