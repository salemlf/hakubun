import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useKanjiAssignmentsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["kanji-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [level]
    ),
  });
};
