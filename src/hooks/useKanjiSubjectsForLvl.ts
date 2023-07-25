import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useKanjiSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["kanji-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiSubjectsByLevel(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [level]
    ),
  });
};
