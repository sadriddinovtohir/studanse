import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import { userMeQuery } from "@/query";
import { Users } from "lucide-react";
import React from "react";
import { useMediaQuery } from "@/components/atoms/UseMediaQuery/UseMediaQuery";
import { useInfiniteScroll } from "@/components/atoms/InfiniteScroll/InfiniteScroll";

export default function AdminHome() {
  const {
    allData: schoolData,
    isLoading,
    isFetchingNextPage,
    lastItemRef,
  } = useInfiniteScroll({
    queryKey: ["user-me-all"],
    queryFn: ({ page, size }) => userMeQuery({ page, size }).queryFn(),
    pageSize: 3,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="mb-24 px-4 sm:px-6  mx-auto">
      
      <div className="py-6 ">
        <CustomIcon
          icon={Users}
          title={"Admin Dashboard"}
          titlesize={isMobile ? 22 : 30}
          iconsize={20}
        />
      </div>

      <div
        className={`
          grid gap-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          justify-items-center
        `}
      >
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-full max-w-[450px]">
                  <CustomCard isLoading />
                </div>
              ))
          : schoolData?.map((item, index) => {
              if (!item || item?.className == undefined) return null;

              const isLast = schoolData.length === index + 1;

              return (
                <div
                  ref={isLast ? lastItemRef : null}
                  key={item.id || index}
                  className="w-full max-w-[450px] mx-auto"
                >
                  <CustomCard
                    title={String(item?.className)}
                    abents={item?.absentStudents}
                    height={"200px"}
                    late={item.lateStudents}
                    deta={item.totalStudents}
                    className="
                      shadow-md 
                      hover:shadow-xl 
                      transition 
                      duration-300 
                      rounded-2xl 
                      bg-white/80 
                      backdrop-blur
                    "
                  />
                </div>
              );
            })}
      </div>

      {isFetchingNextPage && (
        <div
          className={`
            grid gap-5 mt-5
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
    </div>
  );
}