import React from "react";
import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import { useInfiniteScroll } from "@/components/atoms/InfiniteScroll/InfiniteScroll";
import { useMediaQuery } from "@/components/atoms/UseMediaQuery/UseMediaQuery";
import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import { CustomDialog } from "@/components/organisms/CustomDialog";
import { MeUrl } from "@/query";
import { Building2 } from "lucide-react";

export default function SuperAdminHome() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const {
    allData: allSchools,
    isLoading,
    isFetchingNextPage,
    lastItemRef,
  } = useInfiniteScroll({
    queryKey: ["superAdminMeurl"],
    queryFn: ({ page, size }) => MeUrl({ page, size }).queryFn(),
    pageSize: 3,
  });

  const isMobile = useMediaQuery("(max-width: 1212px)");

  return (
    <div>
      <CustomIcon
        icon={Building2}
        title={"System Admin Dashboard"}
        titlesize={30}
      />

      <div
        className={`flex ${
          isMobile ? "justify-center" : "justify-start"
        } gap-5 flex-wrap`}
      >
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <CustomCard key={i} isLoading />)
          : allSchools?.map((item, index) => {
              // ← null o'rniga key bilan fragment qaytaramiz
              if (!item || !item.address)
                return <React.Fragment key={item?.id ?? index} />;

              const isLast = allSchools.length === index + 1;

              return (
                <div
                  ref={isLast ? lastItemRef : null}
                  key={item.id}
                  onClick={() => {
                    setSelectedSchool(item);
                    setOpen(true);
                  }}
                  className="w-full max-w-[450px]"
                >
                  <CustomCard
                    BadgeVariants={String(item?.status)}
                    Badgeboolean
                    avatarFallback={item?.countryCode}
                    title={String(item?.schoolName)}
                    established={item?.establishedYear}
                    students={item?.totalStudents}
                    classes={item?.totalClassGroups}
                    teachers={item?.totalTeachers}
                    admins={item?.totalAdmins}
                  />
                </div>
              );
            })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center gap-5 flex-wrap mt-5">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <CustomCard key={i} isLoading />
            ))}
        </div>
      )}

      {/* CustomDialog faqat bir marta, map dan tashqarida */}
      {selectedSchool && (
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
      )}
    </div>
  );
}
