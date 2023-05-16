import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

import { setSubjectAvailImgs } from "../services/ImageSrcService";

// TODO: increase time to wait between data fetches
export const useSubjectsCurrLevel = (level: any) => {
  return useQuery({
    queryKey: ["subjects-curr-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

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
