import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import { BookOpen } from "lucide-react";
import React from "react";

export default function StudentHome() {
  return (
    <div>
      <div className="flex flex-wrap justify-center w-full w-[1100px]">
        <div>
          <div className="w-full w-[500px] border border-1 p-4 rounded-md">
            <CustomIcon
              title={`Today's Subjects`}
              className={"border-green-500 rounded-[50%] p-2 bg-green-900"}
              icon={BookOpen}
              titlesize={20}
              iconsize={20}
              iconColor={"text-green-500"}
            />
            <p className="text-textColor mt-[-20px] block">
              You have the following subjects today:
            </p>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
