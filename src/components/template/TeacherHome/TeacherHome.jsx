
import { useMediaQuery } from "@/components/atoms/UseMediaQuery/UseMediaQuery";
import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import DataCard from "@/components/organisms/DataCard";
import { teacherClassesstudentsQuery, userMeQuery } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherHome() {
  const { data } = useQuery({ ...userMeQuery() });
  const { data: secondData } = useQuery({ ...teacherClassesstudentsQuery() });
  const Clases = secondData?.data?.data || [];

  const groupState = data?.data?.classGroupStats || [];
  const AllData = data?.data?.classGroupStats || [];


  const isMobile = useMediaQuery("(max-width: 912px)");


  return (
    <div>
      <DataCard
        titleIcon={CalendarDays}
        iconblock={"border p-2 w-[47px] rounded-xl bg-[#8580FFFF]"}
        iconclassName={"w-[30px] h-[30px] text-white"}
        iconSize={30}
        iconTitle={"Today's Timetable"}
        titleSize={22}
        data={groupState}
      />
      <div className={`flex justify-center ${isMobile ? "justify-center" : "justify-between"} gap-5 flex-wrap w-full `}>
    
        {AllData?.map((item, index) => (
          <Link key={index}>
            <div className="w-[400px]">
              <CustomCard
                height={230}
                Badgeboolean={false}
                deta={item?.totalStudents}
                title={item.lessonName}
                mkClass={item.className}
                abents={item.absentStudents}
                late={item.lateStudents}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}