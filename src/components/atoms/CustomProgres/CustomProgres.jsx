import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const PERIOD_TOTAL = {
    WEEKLY: 7,
    MONTHLY: 30,
    YEARLY: 365,
};
const TYPE_LABEL = {
    NO_ABSENT: "No Absent",
};

export default function GrowthProgress({ achievementType, achievementPeriod }) {
    const [value, setValue] = useState(0);

    const total = PERIOD_TOTAL[achievementPeriod] ?? 7;
    const done = 1;
    const percent = Math.min(Math.round((done / total) * 100), 100);
    const label = TYPE_LABEL[achievementType] ?? achievementType;

    useEffect(() => {
        if (!achievementType || !achievementPeriod) return;

        setValue(0);
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            setValue(i);
            if (i >= percent) clearInterval(interval);
        }, 20);

        return () => clearInterval(interval);
    }, [achievementType, achievementPeriod, percent]);

    return (
        <div className="w-[300px] space-y-3">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <Progress value={value} className="h-3" />
        </div>
    );
}