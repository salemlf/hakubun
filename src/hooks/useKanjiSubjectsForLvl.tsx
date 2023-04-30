import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useKanjiSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["kanji-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiSubjectsByLevel(level),
    enabled: !!level,
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
