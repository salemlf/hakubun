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
    // stale time of 5 hours
    staleTime: 5 * 60 * (60 * 1000),
    // cache time of 6 hours
    cacheTime: 6 * 60 * (60 * 1000),
  });
};
