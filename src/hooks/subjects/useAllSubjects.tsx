import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService";

export const useAllSubjects = () => {
  return useQuery({
    queryKey: ["all-subjects"],
    queryFn: () => WaniKaniAPI.getAllSubjects(),
    select: (data: any) => {
      return flattenData(data);
    },
    // stale time of 6 hours
    staleTime: 6 * 60 * (60 * 1000),
    // cache time of 7 hours
    cacheTime: 7 * 60 * (60 * 1000),
  });
};
