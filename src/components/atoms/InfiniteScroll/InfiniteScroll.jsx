import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteScroll({ queryKey, queryFn, pageSize = 3 }) {
  const observer = React.useRef();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await queryFn({ page: pageParam, size: pageSize });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.hasNext) {
          return lastPage.data.pageNumber + 1;
        }
        return undefined;
      },
    });

  const lastItemRef = React.useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      if (!node) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }, // 10% ko'rinsayoq trigger
      );

      observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const allData =
    data?.pages?.flatMap((page) => page?.data?.content ?? []) ?? [];

  return {
    allData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    lastItemRef,
  };
}
