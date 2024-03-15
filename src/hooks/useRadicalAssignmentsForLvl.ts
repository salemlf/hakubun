import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useRadicalAssignmentsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
    enabled: !!level,
    select: (data: any) => {
      return flattenData(data);
    },
  });
};
