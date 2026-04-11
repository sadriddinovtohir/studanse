import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const buildPieData = (items, label) => ({
    labels: items.map(i => i.name),
    datasets: [{ label, data: items.map(i => i.value), backgroundColor: items.map(i => i.color + '99'), borderColor: items.map(i => i.color), borderWidth: 1 }]
});

const buildBarData = (days) => ({
    labels: days.map(d => d.dayOfWeek),
    datasets: [
        { label: 'Present', data: days.map(d => d.presentCount), backgroundColor: '#22c55e99', borderColor: '#22c55e', borderWidth: 1, borderRadius: 6 },
        { label: 'Absent', data: days.map(d => d.absentCount), backgroundColor: '#ef444499', borderColor: '#ef4444', borderWidth: 1, borderRadius: 6 },
        { label: 'Late', data: days.map(d => d.lateCount), backgroundColor: '#f9731699', borderColor: '#f97316', borderWidth: 1, borderRadius: 6 },
    ]
});

const buildLineData = (months) => ({
    labels: months.map(m => m.monthName),
    datasets: [
        { label: 'Absent', data: months.map(m => m.absentCount), borderColor: '#ef4444', backgroundColor: '#ef444433', tension: 0.4, fill: true, pointBackgroundColor: '#ef4444' },
        { label: 'Late', data: months.map(m => m.lateCount), borderColor: '#f97316', backgroundColor: '#f9731633', tension: 0.4, fill: true, pointBackgroundColor: '#f97316' },
    ]
});

const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#ccc' } } },
    scales: {
        x: { ticks: { color: '#aaa' }, grid: { color: '#ffffff11' } },
        y: { ticks: { color: '#aaa' }, grid: { color: '#ffffff11' } },
    }
};

const Empty = ({ text }) => (
    <div className="flex items-center justify-center py-10 text-gray-500 text-sm">{text}</div>
);

export default function CustomAdminDataInfo({ type, items, days, months, label }) {
    if (type === 'pie') {
        if (!items?.length) return <Empty text="No absence data available" />;
        return <div className="flex justify-center"><Pie data={buildPieData(items, label)} /></div>;
    }
    if (type === 'bar') {
        if (!days?.length) return <Empty text="No weekly attendance data available" />;
        return <Bar data={buildBarData(days)} options={chartOptions} />;
    }
    if (type === 'line') {
        if (!months?.length) return <Empty text="No monthly trend data available" />;
        return <Line data={buildLineData(months)} options={chartOptions} />;
    }
    return null;
}

CustomAdminDataInfo.jsx
