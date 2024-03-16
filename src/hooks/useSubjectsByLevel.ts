import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { flattenData } from "../services/MiscService";
import { Subject } from "../types/Subject";

export const useSubjectsByLevel = (level: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["subjects-by-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    placeholderData: keepPreviousData,
    enabled: !!level && enabled,
    select: (data: any) => {
      const flattened = flattenData(data);

      const subjectsUpdated = flattened.reduce(function (
        filtered: Subject[],
        subject: Subject
      ) {
        const updatedSubj = setSubjectAvailImgs(subject);
        filtered.push(updatedSubj);
        return filtered;
      }, []);

      return subjectsUpdated;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
