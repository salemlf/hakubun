import { useInfiniteQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenPagesOfData } from "../services/MiscService";

export const useAllSubjects = () => {
  return useInfiniteQuery(
    ["all-subjects"],
    ({ pageParam }) => {
      return WaniKaniAPI.getAllSubjects(pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.length !== 0 ? lastPage.pages.next_url : null;
      },
      select: (data: any) => {
        let flattenedPages = flattenPagesOfData(data);
        return flattenedPages;
      },
      keepPreviousData: true,
      // stale time of 8 hours
      staleTime: 8 * 60 * (60 * 1000),
      // cache time of 9 hours
      cacheTime: 9 * 60 * (60 * 1000),
      refetchOnWindowFocus: false,
    }
  );
};
