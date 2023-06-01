import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { flattenData } from "../services/MiscService";

export const useSubjectsByIDs = (ids: number[]) => {
  return useQuery({
    queryKey: ["subjects-by-ids", ids],
    queryFn: () => WaniKaniAPI.getSubjectsBySubjIDs(ids),
    enabled: !!ids && !!ids.length,
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
        return subjsUpdated;
      },
      [ids]
    ),
  });
};
