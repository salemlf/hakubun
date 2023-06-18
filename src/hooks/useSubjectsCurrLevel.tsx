import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { flattenData } from "../services/MiscService";

// TODO: increase cache time and stale time since subjects (cache time should always be > stale time)
export const useSubjectsCurrLevel = (level: any) => {
  return useQuery({
    queryKey: ["subjects-curr-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    enabled: !!level,
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
  });
};
