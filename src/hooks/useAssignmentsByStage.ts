import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { SrsLevelName } from "../types/MiscTypes";
import { flattenData } from "../services/MiscService/MiscService";
import { Assignment } from "../types/Assignment";

export const useAssignmentsByStage = (stage: SrsLevelName) => {
  return useQuery({
    queryKey: ["assignments-by-stage", stage],
    queryFn: () => WaniKaniAPI.getAssignmentsByStage(stage),
    enabled: !!stage,
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
  });
};
