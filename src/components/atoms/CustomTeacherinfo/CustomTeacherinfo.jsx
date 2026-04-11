import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale,
  BarElement, PointElement, LineElement, Tooltip, Legend
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const COLORS = ['#ef4444', '#f97316', '#a855f7', '#22c55e', '#9ca3af', '#facc15', '#3b82f6']

const buildDonutData = (items, label) => ({
  labels: items.map(i => i.name || i.className),
  datasets: [{
    label,
    data: items.map(i => i.value ?? i.count),
    backgroundColor: items.map((_, idx) => COLORS[idx % COLORS.length] + 'cc'),
    borderColor: items.map((_, idx) => COLORS[idx % COLORS.length]),
    borderWidth: 2,
  }]
});

const buildBarData = (days) => ({
  labels: days.map(d => d.dayOfWeek?.slice(0, 3)),
  datasets: [
    { label: 'Absent', data: days.map(d => d.absentCount), backgroundColor: '#ef444499', borderColor: '#ef4444', borderWidth: 1, borderRadius: 6 },
    { label: 'Late',   data: days.map(d => d.lateCount),   backgroundColor: '#f9731699', borderColor: '#f97316', borderWidth: 1, borderRadius: 6 },
  ]
});

const buildLineData = (months) => ({
  labels: months.map(m => m.monthName),
  datasets: [
    { label: 'Absent', data: months.map(m => m.absentCount), borderColor: '#ef4444', backgroundColor: '#ef444422', tension: 0.4, fill: true, pointBackgroundColor: '#ef4444', pointRadius: 4 },
    { label: 'Late',   data: months.map(m => m.lateCount),   borderColor: '#f97316', backgroundColor: '#f9731622', tension: 0.4, fill: true, pointBackgroundColor: '#f97316', pointRadius: 4 },
  ]
});

const darkOptions = (hasAxes = true) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#9ca3af', boxWidth: 10, padding: 12, font: { size: 11 } }
    }
  },
  ...(hasAxes && {
    scales: {
      x: { ticks: { color: '#6b7280' }, grid: { color: '#ffffff0d' } },
      y: { ticks: { color: '#6b7280' }, grid: { color: '#ffffff0d' }, beginAtZero: true },
    }
  })
});

const donutOptions = {
  responsive: true,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#9ca3af', boxWidth: 10, padding: 10, font: { size: 11 } }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}`
      }
    }
  }
};

const Empty = ({ text }) => (
  <div className="flex items-center justify-center py-10 text-gray-500 text-sm">{text}</div>
);

export default function CustomTeacherinfo({ type, items, days, months, label }) {
  if (type === 'pie') {
    if (!items?.length) return <Empty text="No data available" />;
    return (
      <div className="flex justify-center max-w-[280px] mx-auto">
        <Doughnut data={buildDonutData(items, label)} options={donutOptions} />
      </div>
    );
  }
  if (type === 'bar') {
    if (!days?.length) return <Empty text="No weekly attendance data" />;
    return <Bar data={buildBarData(days)} options={darkOptions(true)} />;
  }
  if (type === 'line') {
    if (!months?.length) return <Empty text="No monthly trend data" />;
    return <Line data={buildLineData(months)} options={darkOptions(true)} />;
  }
  return null;
}