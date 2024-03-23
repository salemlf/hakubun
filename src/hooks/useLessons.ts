import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";
import { Assignment } from "../types/Assignment";

export const useLessons = () => {
  return useQuery({
    queryKey: ["available-lessons"],
    queryFn: WaniKaniAPI.getLessons,
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
    // stale time of 20 minutes
    staleTime: 20 * (60 * 1000),
    // garbage collection time of 30 minutes
    gcTime: 30 * (60 * 1000),
  });
};
