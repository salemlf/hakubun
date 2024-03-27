import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Kanji } from "../../types/Subject";
import { subjectKeys } from "./subjectsKeyFactory";

export const useKanjiSubjectsForLvl = (level: number) => {
  return useQuery({
    queryKey: subjectKeys.kanjiByLvl(level),
    queryFn: () => WaniKaniAPI.getKanjiSubjectsByLevel(level),
    select: (data) => {
      const flattenedSubj: Kanji[] = flattenData(data);
      return flattenedSubj;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // garbage collection time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
