import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const COLORS = ['#ef4444', '#f59e0b', '#a855f7', '#3b82f6', '#22c55e', '#ec4899'];


const makeCenterPlugin = (label) => ({
    id: 'centerText',
    beforeDraw(chart) {
        const { width, height, ctx, canvas } = chart;
        
        // textColor ni DOM dan o'qiymiz
        const textColor = getComputedStyle(canvas).getPropertyValue('color') || '#ffffff';

        ctx.restore();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillStyle = textColor;   // ← dynamic
        ctx.fillText(label, width / 2, height / 2 - 10);
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillText('Total', width / 2, height / 2 + 18);
        ctx.save();
    },
});

const makeOptions = (rotation) => ({
    cutout: '65%',
    rotation: rotation,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx) => ' ' + ctx.label + ': ' + ctx.parsed + '%',
            },
        },
    },
});

const toVisual = (v) => (v < 2 ? 2 : v);

function AttendanceChart({ overview }) {
    const present = overview.presentPercentage ?? 0;
    const late = overview.latePercentage ?? 0;
    const absent = overview.absentPercentage ?? 0;

    const stats = [
        { label: 'Present', color: '#22c55e', value: present },
        { label: 'Late', color: '#f59e0b', value: late },
        { label: 'Absence', color: '#ef4444', value: absent },
    ];

    const chartData = {
        datasets: [
            {
                data: stats.map((s) => toVisual(s.value)),
                backgroundColor: stats.map((s) => s.color + 'cc'),
                borderColor: 'transparent',
                borderWidth: 4,
                borderRadius: 10,
                spacing: 8,
                hoverOffset: 3,
            },
        ],
    };

    const rotation = -90 - ((present / 100) * 360) / 2;

    return (
        <div className="flex flex-col items-center text-textColor gap-6 p-6 sm:p-8 w-full">
            <div className="w-[180px] h-[180px] text-textColor sm:w-[220px] sm:h-[220px]">
                <Doughnut
                    data={chartData}
                    options={makeOptions(rotation)}
                    plugins={[makeCenterPlugin('100%'),]}
                />
            </div>
            <div className="flex w-full justify-around sm:justify-center sm:gap-12 lg:gap-[200px]">
                {stats.map(({ label, color, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: color, boxShadow: '0 0 6px ' + color }}
                            />
                            <span className="text-textColor text-xs sm:text-sm">{label}</span>
                        </div>
                        <span className="text-textColor text-lg sm:text-xl font-bold text-center">
                            {value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReasonChart({ reasons }) {
    const total = reasons.reduce((sum, r) => sum + r.count, 0);

    const stats = reasons.map((r, i) => ({
        label: r.reasonName.charAt(0).toUpperCase() + r.reasonName.slice(1),
        color: COLORS[i % COLORS.length],
        count: r.count,
        value: r.percentage,
    }));

    const chartData = {
        labels: stats.map((s) => s.label),
        datasets: [
            {
                data: stats.map((s) => toVisual(s.value)),
                backgroundColor: stats.map((s) => s.color + 'cc'),
                borderColor: 'transparent',
                borderWidth: 4,
                borderRadius: 10,
                spacing: 8,
                hoverOffset: 3,
            },
        ],
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 sm:p-8 w-full">
            <div className="w-[180px] h-[180px] text-textColor sm:w-[220px] sm:h-[220px]">
                <Doughnut
                    data={chartData}
                    options={makeOptions(-90)}
                    plugins={[makeCenterPlugin(String(total)),]}
                />
            </div>
            <div className="flex flex-col w-full gap-2 px-2">
                {stats.map(({ label, color, count, value }) => (
                    <div key={label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: color, boxShadow: '0 0 6px ' + color }}
                            />
                            <span className="text-textColor text-sm">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-textColor font-bold text-sm">{count}</span>
                            <span className="text-textGrey text-sm">({value}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CustomInfo({ attendanceOverview, absenceByReason, lateByReason }) {
    if (attendanceOverview) {
        return <AttendanceChart overview={attendanceOverview} />;
    }
    if (absenceByReason && absenceByReason.length > 0) {
        return <ReasonChart reasons={absenceByReason} />;
    }
    if (lateByReason && lateByReason.length > 0) {
        return <ReasonChart reasons={lateByReason} />;
    }
    return null;
}