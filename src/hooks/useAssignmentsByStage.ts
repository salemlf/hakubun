import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { SrsLevelName } from "../types/MiscTypes";
import { flattenData } from "../services/MiscService";

export const useAssignmentsByStage = (stage: SrsLevelName) => {
  return useQuery({
    queryKey: ["assignments-by-stage", stage],
    queryFn: () => WaniKaniAPI.getAssignmentsByStage(stage),
    enabled: !!stage,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [stage]
    ),
  });
};
