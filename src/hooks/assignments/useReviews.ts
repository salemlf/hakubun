import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useReviews = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: assignmentKeys.reviews(),
    queryFn: () => WaniKaniAPI.getAssignmentsAvailForReview(),
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
    enabled: isEnabled,
    // stale time of 20 minutes
    staleTime: 20 * (60 * 1000),
    // garbage collection time of 30 minutes
    gcTime: 30 * (60 * 1000),
  });
};
