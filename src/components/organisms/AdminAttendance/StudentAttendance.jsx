import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon';
import { WaveLoader } from '@/components/atoms/Loaer/Weveloader';
import { ThemaContext } from '@/context/ThemaContext';
import { adminInfoGetStudentQuery } from '@/query';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Check, X, Clock } from 'lucide-react';
import React, { useContext } from 'react'

export default function AdminAttendance({ filterData }) {
    const thema = useContext(ThemaContext)
    const { studentId, fromDate, toDate, studentName, email, className } = filterData;
    const id = studentId;

    const { data, isLoading } = useQuery({ ...adminInfoGetStudentQuery(id) })
    const studentData = data?.data?.data || {};

    console.log(data);


    if (isLoading) {
        return <div className='flex justify-center items-center'>
            <WaveLoader />
        </div>
    }

    const stats = [
        { label: "Total Days", value: studentData.totalDays, color: "text-textColor" },
        { label: "Present", value: studentData.presentDays, color: "text-green-500" },
        { label: "Absent", value: studentData.absentDays, color: "text-red-500" },
        { label: "Late", value: studentData.lateDays, color: "text-orange-500" },
        { label: "Attendance Rate", value: `${studentData.attendanceRate ?? 0}%`, color: "text-orange-400" },
    ];

    return (
        <div>
            <CustomIcon
                iconsize={20}
                className={"w-[40px] h-[40px] bg-[#00C1A2FF] border-none"}
                iconColor={'text-[#AD46FFFF]'}
                icon={Calendar} font={600} titlesize={20}
                title='Individual Student Report'
            />

            <div className='w-full text-textGrey mb-[30px] p-[20px] bg-[#2B272D31] rounded-xl'>
                <h1 className='mb-[10px] text-textColor text-[25px]'>
                    {studentData.firstName ?? "loading..."}
                </h1>
                <p>{studentData.email ?? "loading..."}</p>
                <p>Classes: {studentData.className ?? "loading..."}</p>
                <p>Period: {studentData.fromDate ?? "loading..."} to: {studentData.toDate ?? "loading..."}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#2B272D31] shadow-md"
                    >
                        <span className={`text-2xl font-bold ${stat.color}`}>{stat.value ?? "—"}</span>
                        <span className="text-sm text-textGrey mt-1">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full text-textGrey mb-[30px] p-[20px] bg-[#2B272D31] rounded-xl">
                <h2 className="text-textColor text-xl font-semibold mb-4">Detailed Attendance Records</h2>
                <div className="max-h-[600px] overflow-y-auto space-y-3 pr-1">
                    {studentData.detailedRecords?.map((record, index) => {
                        const isAbsent = record.status === "ABSENT";
                        const isLate = record.status === "LATE";

                        const bgColor = isAbsent
                            ? "bg-[#6B2D3E]"
                            : isLate
                                ? "bg-[#5C4A1E]"
                                : "bg-[#1E4A3E]";

                        const iconBg = isAbsent
                            ? "bg-red-600"
                            : isLate
                                ? "bg-yellow-600"
                                : "bg-green-600";

                        const badgeColor = isAbsent
                            ? "bg-red-500 text-white"
                            : isLate
                                ? "bg-yellow-500 text-white"
                                : "bg-green-500 text-white";

                        const reasonBg = isAbsent
                            ? "bg-[#7A3040]"
                            : isLate
                                ? "bg-[#6B5520]"
                                : "";

                        const StatusIcon = isAbsent ? X : isLate ? Clock : Check;

                        return (
                            <div key={index} className={`flex items-start gap-4 p-4 rounded-xl ${bgColor}`}>
                                <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-white flex-shrink-0 ${iconBg}`}>
                                    <StatusIcon size={20} />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-semibold">{record.date}</span>
                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeColor}`}>
                                            {record.status}
                                        </span>
                                    </div>
                                    {record.reasonName && (
                                        <div className={`text-sm text-white px-3 py-2 rounded-lg w-fit ${reasonBg}`}>
                                            <span className="font-semibold">Reason:</span> {record.reasonName}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}