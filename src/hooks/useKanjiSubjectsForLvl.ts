import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";
import { Kanji } from "../types/Subject";

export const useKanjiSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["kanji-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiSubjectsByLevel(level),
    enabled: !!level,
    select: (data: any) => {
      const flattenedSubj: Kanji[] = flattenData(data);
      return flattenedSubj;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
