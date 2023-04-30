import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useKanjiAssignmentsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["kanji-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
    enabled: !!level,
    select: (data) => data.data,
  });
};
