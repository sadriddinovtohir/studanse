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
  console.log(secondData);


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
      <div className="flex justify-around gap-y-5 flex-wrap w-full ">

        {Clases?.map((item) => (
          <Link>

            <div className="w-[400px]" key={item.classId}>
              <CustomCard
                height={230}
                // BadgeVariants="active"
                Badgeboolean={false}
                deta={item?.students.length + " students"}
                // src={user}
                title={item.className}
                mkClass={item.className}
              // abents={2}
              // late={1}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
