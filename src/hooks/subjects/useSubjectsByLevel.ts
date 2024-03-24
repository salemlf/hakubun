import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../../services/MiscService/MiscService";
import { Subject } from "../../types/Subject";
import { subjectKeys } from "./subjectsKeyFactory";

export const useSubjectsByLevel = (level: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: subjectKeys.byLvl(level),
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    placeholderData: keepPreviousData,
    enabled: enabled,
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
    // garbage collection time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
