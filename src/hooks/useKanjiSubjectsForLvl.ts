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
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    cacheTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
