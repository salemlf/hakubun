import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useAssignmentsBySubjIDs = (
  ids: number[],
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["assignments-by-subj-ids", ids],
    queryFn: () => WaniKaniAPI.getAssignmentsBySubjIDs(ids),
    enabled: ids.length !== 0 && enabled,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [ids]
    ),
  });
};
