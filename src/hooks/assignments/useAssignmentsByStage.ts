import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { SrsLevelName } from "../../types/MiscTypes";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useAssignmentsByStage = (stage: SrsLevelName) => {
  return useQuery({
    queryKey: assignmentKeys.byStage(stage),
    queryFn: () => WaniKaniAPI.getAssignmentsByStage(stage),
    enabled: !!stage,
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(
        pagedData.data
      ) as Assignment[];
      return flattenedData;
    },
  });
};
