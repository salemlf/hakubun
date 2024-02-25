import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../services/MiscService/MiscService";

export const useSubjectsByIDs = (
  ids: number[],
  enabled: boolean = true,
  sortByLvl: boolean = false
) => {
  return useQuery({
    queryKey: ["subjects-by-ids", ids],
    queryFn: () => WaniKaniAPI.getSubjectsBySubjIDs(ids),
    enabled: enabled && ids.length !== 0,
    select: useCallback(
      (data: any) => {
        let flattened = flattenData(data);

        let subjsUpdated = flattened.reduce(function (
          filtered: any,
          subject: any
        ) {
          let updatedSubj = setSubjectAvailImgs(subject);
          filtered.push(updatedSubj);
          return filtered;
        },
        []);

        if (sortByLvl) {
          let sortedByLvl = subjsUpdated.sort(
            (a: any, b: any) => a.level - b.level
          );
          return sortedByLvl;
        }

        return subjsUpdated;
      },
      [ids]
    ),
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    cacheTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
