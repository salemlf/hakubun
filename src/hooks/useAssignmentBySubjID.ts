import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenCollectionOfOne } from "../services/MiscService/MiscService";
import { Assignment } from "../types/Assignment";

export const useAssignmentBySubjID = (ids: number[]) => {
  return useQuery({
    queryKey: ["assignment-by-subj-id", ids],
    queryFn: () => WaniKaniAPI.getAssignmentsBySubjIDs(ids),
    enabled: !!ids && !!ids.length,
    select: (data) => {
      if (data.data.length) {
        return flattenCollectionOfOne(data) as Assignment;
      }
      return undefined;
    },
  });
};
