const statusConfig = {
    PRESENT: {
        color: "#22c55e",
        bg: "bg-[rgba(34,197,94,0.12)]",
        border: "border-[rgba(34,197,94,0.3)]",
        label: "Present",
    },
    LATE: {
        color: "#f59e0b",
        bg: "bg-[rgba(245,158,11,0.12)]",
        border: "border-[rgba(245,158,11,0.3)]",
        label: "Late",
    },
    ABSENT: {
        color: "#ef4444",
        bg: "bg-[rgba(239,68,68,0.12)]",
        border: "border-[rgba(239,68,68,0.3)]",
        label: "Absence",
    },
};
const formatDay = (dayOfWeek) => {
    const map = {
        MONDAY: "Mon", TUESDAY: "Tue", WEDNESDAY: "Wed",
        THURSDAY: "Thu", FRIDAY: "Fri", SATURDAY: "Sat", SUNDAY: "Sun",
    };
    return map[dayOfWeek] || dayOfWeek;
};
export default function StudentWeekly({ weeklyDays = [] }) {
    if (!weeklyDays.length) {
        return <p className="text-[#aaa] text-center">No information available</p>;
    }


    return (
        <div className="px-2 py-4 sm:px-5 sm:py-5">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📅</span>
                <span className="text-textColor font-semibold text-sm sm:text-base">
                    Weekly Attendance
                </span>
            </div>
            <div className="flex gap-2 flex-wrap">
                {weeklyDays.map(({ date, dayOfWeek, status, reasonName }) => {
                    const cfg = statusConfig[status] || statusConfig.ABSENT;
                    return (
                        <div key={date} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-[#ccc] font-semibold text-[10px] sm:text-sm">
                                {formatDay(dayOfWeek)}
                            </span>
                            <div
                                title={reasonName || ""}
                                className={`
                                    w-full flex flex-col items-center justify-center gap-2
                                    ${cfg.bg} ${cfg.border} border rounded-xl
                                    py-3 px-1 sm:py-5 sm:px-2
                                    cursor-pointer hover:scale-105 transition-transform duration-200
                                `}
                            >
                                <div
                                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shrink-0"
                                    style={{
                                        background: cfg.color,
                                        boxShadow: `0 0 8px ${cfg.color}`,
                                    }}
                                />
                                <span className="text-textColor text-[9px] sm:text-xs font-semibold text-center leading-tight">
                                    {cfg.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}