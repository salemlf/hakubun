import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useAssignmentsBySubjIDs = (ids: number[]) => {
  return useQuery({
    queryKey: ["assignments-by-subj-ids", ids],
    queryFn: () => WaniKaniAPI.getAssignmentsBySubjIDs(ids),
    enabled: !!ids && !!ids.length,
    select: useCallback(
      (data: any) => {
        return flattenData(data);
      },
      [ids]
    ),
  });
};
