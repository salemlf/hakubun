import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { SrsLevelName } from "../types/MiscTypes";

// TODO: increase time to wait between data fetches
export const useAssignmentsByStage = (stage: SrsLevelName) => {
  return useQuery({
    queryKey: ["assignments-by-stage", stage],
    queryFn: () => WaniKaniAPI.getAssignmentsByStage(stage),
    enabled: !!stage,
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        return flattened;
      },
      [stage]
    ),
  });
};
