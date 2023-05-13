import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { Subject } from "../types/Subject";

// TODO: increase time to wait between data fetches
export const useKanjiAssignmentsForLvl = (
  level: any,
  needsRelatedSubj: boolean,
  relatedSubjs?: Subject[]
) => {
  // TODO: change this, it's an icky mess
  let dependencies = needsRelatedSubj ? !!level && !!relatedSubjs : !!level;
  return useQuery({
    queryKey: ["kanji-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
    // enabled: !!level && !!relatedSubjs,
    enabled: dependencies,
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        return flattened;
      },
      [level]
    ),
  });
};
