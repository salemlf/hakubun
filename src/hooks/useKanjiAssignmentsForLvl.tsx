import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { Subject } from "../types/Subject";

// TODO: increase time to wait between data fetches
export const useKanjiAssignmentsForLvl = (
  level: any,
  relatedSubjs: Subject[]
) => {
  return useQuery({
    queryKey: ["kanji-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
    enabled: !!level && !!relatedSubjs,
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
