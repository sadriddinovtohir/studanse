import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import StudanceReportStatus from "@/components/organisms/StudanceReportStatus/StudanceReportStatus";
import { Spinner } from "@/components/ui/spinner";
import { userMeQuery } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar, Clock, Delete, Edit, User } from "lucide-react";
import React from "react";

export default function StudentHome() {
  const { data } = useQuery({ ...userMeQuery() });
  const studentInfo = data?.data?.studentInfo;
  const todaySubjects = data?.data?.todaySubjects;
  const scheduledReports = data?.data?.scheduledReports;

  console.log(data);


  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="border border-[#29323C] p-4 rounded-xl">
            <CustomIcon
              title="Today's Subjects"
              className="border-none bg-[#07331F] rounded-full p-2"
              icon={BookOpen}
              titlesize={17}
              iconsize={20}
              iconColor="text-green-500"
            />
            <p className="text-textColor mt-2">
              You have the following subjects today:
            </p>
            {todaySubjects?.map((el, index) => (
              <div className="flex gap-2" key={index + 1}>
                <Clock />
                <div>
                  <h4 className="text-textColor">
                    {index + 1}. {el?.subjectName}
                  </h4>
                  <p className="text-textGray">
                    From {el?.startTime} to {el?.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[#29323C] p-4 rounded-xl">
            <CustomIcon
              title="Scheduled Reports"
              className="border-none bg-[#3B1F0F] rounded-full p-2"
              icon={Calendar}
              titlesize={17}
              iconsize={20}
              iconColor="text-[#FF8904]"
            />
            <div className="text-textColor">
              {scheduledReports?.map((res, index) => (
                <div
                  key={index + 1}
                  className={` w-full max-w-[50px] border border-1 border-[yellow] bg-yellow-400 ${res?.type == "LATE" ? "" : null} `}
                >
                  <div>
                    {res?.type == "LATE"
                      ? "Medical Appointment"
                      : "Family Emergency"}
                    <div>
                      {res?.type}
                      <Edit />
                      <Delete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Info — chap ustun pastida */}
          <div className="border border-[#29323C] text-textColor rounded-xl p-4">
            <CustomIcon
              title="Student Information"
              icon={User}
              iconsize={20}
              titlesize={20}
              className="rounded-[50px] border-none bg-[#14294D]"
            />
            <div className="mt-3 flex flex-col gap-2">
              {[
                { label: "Name", value: studentInfo?.fullName },
                { label: "Phone", value: studentInfo?.phone },
                { label: "Class", value: studentInfo?.className },
                { label: "School", value: studentInfo?.schoolName },
                { label: "Teacher", value: studentInfo?.teacherName },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-textGrey">{label}:</span>
                  <span>{value ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* O'ng ustun — to'liq balandlik */}
        <div className="border border-[#29323C] p-4 rounded-xl h-fit">
          <StudanceReportStatus />
        </div>
      </div>
    </div>
  );
}
