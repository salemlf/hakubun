import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useRadicalAssignmentsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-assignments-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        return flattened;
      },
      [level]
    ),
  });
};
