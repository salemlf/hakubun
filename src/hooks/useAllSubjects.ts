import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenPagesOfData } from "../services/MiscService/MiscService";

export const useAllSubjects = () => {
  return useInfiniteQuery({
    queryKey: ["all-subjects"],
    initialPageParam: "",
    queryFn: ({ pageParam }) => WaniKaniAPI.getAllSubjects(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.length !== 0 ? lastPage.pages.next_url : null;
    },
    select: (data: any) => {
      const flattenedPages = flattenPagesOfData(data);
      return flattenedPages;
    },
    placeholderData: keepPreviousData,
    // stale time of 8 hours
    staleTime: 8 * 60 * (60 * 1000),
    // cache time of 9 hours
    gcTime: 9 * 60 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
