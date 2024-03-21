import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { SubjectCollection } from "../types/Collection";
import { PreFlattenedSubject } from "../types/Subject";

type PagedSubjCollection = {
  pageParams: string[];
  pages: SubjectCollection[];
};

const flattenPagesOfData = (data: PagedSubjCollection) => {
  const flattenedData = data.pages.map((elem: SubjectCollection) => {
    return [...elem.data];
  });

  const flattenedPages = flattenedData.flat(1);
  return flattenedPages;
};

export const useAllSubjects = () => {
  return useInfiniteQuery({
    queryKey: ["all-subjects"],
    initialPageParam: "",
    queryFn: ({ pageParam }) => WaniKaniAPI.getAllSubjects(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.length !== 0 ? lastPage.pages.next_url : null;
    },
    select: (data: PagedSubjCollection) => {
      const flattenedPages: PreFlattenedSubject[] = flattenPagesOfData(data);
      return flattenedPages;
    },
    placeholderData: keepPreviousData,
    // stale time of 8 hours
    staleTime: 8 * 60 * (60 * 1000),
    // garbage collection time of 9 hours
    gcTime: 9 * 60 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
