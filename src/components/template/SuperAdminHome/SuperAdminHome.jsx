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

  

  const isMobile = useMediaQuery("(max-width: 712px)");

  const handleCardClick = (item) => {
    setSelectedSchool(item);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const skeletonCount = isMobile ? 2 : 6;

  return (
    <div className="mb-24 px-4 sm:px-6  mx-auto">


      <div className="py-6">
        <CustomIcon
          icon={Building2}
          title="System Admin Dashboard"
          titlesize={isMobile ? 22 : 28}
        />
      </div>

      <div
        className={`
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          justify-items-center
        `}
      >
        {isLoading
          ? Array(skeletonCount)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full max-w-[450px]">
                <CustomCard isLoading />
              </div>
            ))
          : allSchools?.map((item, index) => {
            if (!item || !item.address)
              return <React.Fragment key={item?.id ?? index} />;

            const isLast = allSchools.length === index + 1;

            return (
              <div
                ref={isLast ? lastItemRef : null}
                key={item.id || index}
                onClick={() => handleCardClick(item)}
                className="w-full max-w-[450px] cursor-pointer mx-auto"
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
                  height={"250px"}
                />
              </div>
            );
          })}
      </div>

      {isFetchingNextPage && (
        <div
          className={`
            grid gap-4 mt-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            justify-items-center
          `}
        >
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full max-w-[450px]">
                <CustomCard isLoading />
              </div>
            ))}
        </div>
      )}

      {selectedSchool && (
        <CustomDialog
          open={open}
          onClose={handleDialogClose}
          title="School Details"
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