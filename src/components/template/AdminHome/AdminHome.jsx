import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import { userMeQuery } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { initialValues } from "./data";
import { useMediaQuery } from "@/components/atoms/UseMediaQuery/UseMediaQuery";
import { useInfiniteScroll } from "@/components/atoms/InfiniteScroll/InfiniteScroll";

export default function AdminHome() {
  // const [searchParams, setSearchParams] = useSearchParams(initialValues);
  // const { data } = useQuery({ ...userMeQuery(initialValues) });

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
  // const schoolData = data?.data?.content || [];

  const isMobile = useMediaQuery("(max-width: 1212px)");

  // console.log(schoolData);
  return (
    <div>
      <CustomIcon
        icon={Users}
        title={"Admin Dashboard"}
        titlesize={30}
        iconsize={20}
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
          : schoolData?.map((item, index) => {
              // ← null o'rniga key bilan fragment qaytaramiz
              if (!item || item?.className == undefined) return null;

              const isLast = schoolData.length === index + 1;

              return (
                <div
                  ref={isLast ? lastItemRef : null}
                  key={item.id}
                  className="w-full max-w-[450px]"
                >
                  <CustomCard title={String(item?.className)} />
                  {/* <CustomCard
                    // isLoading={isLoading}
                    BadgeVariants="active"
                    deta={"30-september"}
                    // src={user}
                    title={"lorem"}
                    mkClass={"Grade 10A"}
                    abents={2}
                    late={1}
                  /> */}
                </div>
              );
            })}
        {isFetchingNextPage && (
          <div className="flex justify-center gap-5 flex-wrap mt-5">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <CustomCard key={i} isLoading />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
