import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useRadicalAssignmentsForLvl = (level: number) => {
  return useQuery({
    queryKey: assignmentKeys.radicalsByLvl(level),
    queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(
        pagedData.data
      ) as Assignment[];
      return flattenedData;
    },
  });
};
