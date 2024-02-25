import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../services/MiscService/MiscService";

export const useSubjectsByLevel = (level: any, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["subjects-by-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    keepPreviousData: true,
    enabled: !!level && enabled,
    select: (data: any) => {
      const flattened = flattenData(data);

      const subjectsUpdated = flattened.reduce(function (
        filtered: any,
        subject: any
      ) {
        const updatedSubj = setSubjectAvailImgs(subject);
        filtered.push(updatedSubj);
        return filtered;
      },
      []);

      return subjectsUpdated;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    cacheTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
