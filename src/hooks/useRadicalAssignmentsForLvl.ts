import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";
import { Assignment } from "../types/Assignment";

export const useRadicalAssignmentsForLvl = (level: number) => {
  return useQuery({
    queryKey: ["radical-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
    enabled: !!level,
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
  });
};
