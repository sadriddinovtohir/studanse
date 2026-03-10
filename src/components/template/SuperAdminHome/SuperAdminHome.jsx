import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import React from "react";
import { Building2 } from "lucide-react";
import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import { useQuery } from "@tanstack/react-query";
import { MeUrl } from "@/query";
import { CustomDialog } from "@/components/organisms/CustomDialog";
import { useMediaQuery } from "@/components/atoms/UseMediaQuery/UseMediaQuery";

export default function SuperAdminHome() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const { data, isLoading } = useQuery({ ...MeUrl() });
  const ollSchools = data?.data?.content;

  // const { data: dat } = useQuery(());
  const isMobile = useMediaQuery("(max-width: 1012px)");

  return (
    <div>
      <CustomIcon
        icon={Building2}
        title={"System Admin Dashboard"}
        titlesize={30}
      />
      <div
        className={`flex  ${isMobile ? "justify-center" : "justify-between"}  gap-5 flex-wrap  `}
      >
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <CustomCard key={i} isLoading={true} />)
          : ollSchools?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedSchool(item);
                  setOpen(true);
                }}
                className="w-full max-w-[450px]"
              >
                <CustomCard
                  BadgeVariants={String(item.status)}
                  Badgeboolean={true}
                  avatarFallback={item.countryCode}
                  title={String(item.schoolName)}
                  established={item.establishedYear}
                  students={item.totalStudents}
                  classes={item.totalClassGroups}
                  teachers={item.totalTeachers}
                  admins={item.totalAdmins}
                />
              </div>
            ))}
      </div>
      <CustomDialog
        open={open}
        onClose={setOpen}
        title={"School Details"}
        icon={Building2}
        iconsize={20}
        titlesize={17}
        initials={selectedSchool?.countryCode}
        info={selectedSchool?.schoolName}
        status={selectedSchool?.status}
        address={selectedSchool?.address}
        established={selectedSchool?.establishedYear}
        Students={selectedSchool?.totalStudents}
        Teachers={selectedSchool?.totalTeachers}
        Classes={selectedSchool?.totalClassGroups}
        Admins={selectedSchool?.totalAdmins}
        dataes={selectedSchool?.admins}
      />
    </div>
  );
}
