import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { flattenData } from "../services/MiscService";

export const useSubjectsByLevel = (level: any, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["subjects-by-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    keepPreviousData: true,
    enabled: !!level && enabled,
    select: useCallback(
      (data: any) => {
        let flattened = flattenData(data);

        let subjectsUpdated = flattened.reduce(function (
          filtered: any,
          subject: any
        ) {
          let updatedSubj = setSubjectAvailImgs(subject);
          filtered.push(updatedSubj);

          return filtered;
        },
        []);

        return subjectsUpdated;
      },
      [level]
    ),
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    cacheTime: 75 * (60 * 1000),
  });
};
