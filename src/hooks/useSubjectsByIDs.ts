import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../services/MiscService/MiscService";
import { Subject } from "../types/Subject";

export const useSubjectsByIDs = (
  ids: number[],
  enabled: boolean = true,
  sortByLvl: boolean = false
) => {
  return useQuery({
    queryKey: ["subjects-by-ids", ids],
    queryFn: () => WaniKaniAPI.getSubjectsBySubjIDs(ids),
    enabled: enabled && ids.length !== 0,
    select: (data: any) => {
      const flattened = flattenData(data);

      const subjsUpdated = flattened.reduce(function (
        filtered: Subject[],
        subject: Subject
      ) {
        const updatedSubj = setSubjectAvailImgs(subject);
        filtered.push(updatedSubj);
        return filtered;
      }, []);

      if (sortByLvl) {
        const sortedByLvl = subjsUpdated.sort(
          (a: Subject, b: Subject) => a.level - b.level
        );
        return sortedByLvl;
      }

      return subjsUpdated;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
