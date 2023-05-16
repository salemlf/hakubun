import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

import { setSubjectAvailImgs } from "../services/ImageSrcService";

// TODO: increase time to wait between data fetches
export const useRadicalSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalSubjectsByLevel(level),
    enabled: !!level,
    // TODO: simply this further
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        let radsUpdated = flattened.reduce(function (
          filtered: any,
          subject: any
        ) {
          let updatedSubj = setSubjectAvailImgs(subject);
          filtered.push(updatedSubj);

          return filtered;
        },
        []);
        return radsUpdated;
      },
      [level]
    ),
  });
};
