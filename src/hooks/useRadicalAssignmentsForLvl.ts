import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";

export const useRadicalAssignmentsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [level]
    ),
  });
};
