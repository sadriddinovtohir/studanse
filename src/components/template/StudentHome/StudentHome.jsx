import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import StudanceReportStatus from "@/components/organisms/StudanceReportStatus/StudanceReportStatus";
import { student } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar } from "lucide-react";
import React from "react";

export default function StudentHome() {
  const { data, isloadin } = useQuery({ ...student() });
  console.log(data?.data?.data);
  

  return (
    <div>
      <div className="flex flex-wrap justify-center w-full  mx-auto w-[1200px] gap-8">
        <div className="flex flex-col gap-8 w-full max-w-[555px]">
          <div className="w-full max-w-[550px] border border-1  border-[#29323CFF] p-4 rounded-xl">
            <CustomIcon
              title={`Today's Subjects`}
              className={
                "border-none  bg-[#07331FFF] rounded-[50%] p-2 bg-green-900"
              }
              icon={BookOpen}
              titlesize={17}
              iconsize={20}
              iconColor={"text-green-500"}
            />
            <p className="text-textColor mt-[-20px] block">
              You have the following subjects today:
            </p>
          </div>
          <div className="w-full max-w-[550px] border border-1  border-[#29323CFF] p-4 rounded-xl">
            <CustomIcon
              title={`Scheduled Reports`}
              className={"border-none  bg-[#3B1F0FFF]    rounded-[50%] p-2 "}
              icon={Calendar}
              titlesize={17}
              iconsize={20}
              iconColor={"text-[#FF8904FF]"}
            />
          </div>
        </div>
        <div className="w-full max-w-[550px] border border-1  border-[#29323CFF] p-4 rounded-xl">
          <StudanceReportStatus />
        </div>
      </div>
      <div></div>
    </div>
  );
}
