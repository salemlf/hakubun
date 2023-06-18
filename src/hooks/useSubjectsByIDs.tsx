import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { flattenData } from "../services/MiscService";

// TODO: increase cache time and stale time since subjects (cache time should always be > stale time)
export const useSubjectsByIDs = (ids: number[], enabled: boolean = true) => {
  return useQuery({
    queryKey: ["subjects-by-ids", ids],
    queryFn: () => WaniKaniAPI.getSubjectsBySubjIDs(ids),
    enabled: ids.length !== 0 && enabled,
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
