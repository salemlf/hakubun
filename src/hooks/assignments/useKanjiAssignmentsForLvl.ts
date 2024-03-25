import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useKanjiAssignmentsForLvl = (level: number) => {
  return useQuery({
    queryKey: assignmentKeys.kanjiByLvl(level),
    queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
  });
};
