import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useAssignmentsBySubjIDs = (
  ids: number[],
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: assignmentKeys.bySubjIDs(ids),
    queryFn: () => WaniKaniAPI.getAssignmentsBySubjIDs(ids),
    enabled: ids.length !== 0 && enabled,
    select: (data) => {
      const flattenedData: Assignment[] = flattenData(
        data.data
      ) as Assignment[];
      return flattenedData;
    },
  });
};
