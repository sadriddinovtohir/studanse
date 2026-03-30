import DataCardContent from "./DataCardContent";

export default function DataCard({
  titleIcon: Icon,
  iconclassName,
  iconSize,
  iconblock,
  iconTitle,
  titleSize,
  ...dataProps
}) {
  return (
    <div className="w-full border-2 border-textGrey p-10 mb-5 rounded-xl bg-transparent">
      <div className="flex items-center gap-4 mb-5">
        {Icon ? (
          <div className={iconblock}>
            <Icon className={iconclassName} size={iconSize} />
          </div>
        ) : null}

        {iconTitle ? (
          <h2 className="text-textColor" style={{ fontSize: `${titleSize}px` }}>
            {iconTitle}
          </h2>
        ) : null}
      </div>

      <DataCardContent {...dataProps} />
    </div>
  );
}
