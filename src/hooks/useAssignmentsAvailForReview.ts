import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";
import { Assignment } from "../types/Assignment";

// TODO: add call to clear data for review forecast store?
export const useAssignmentsAvailForReview = (
  level: number | undefined,
  isEnabled: boolean = true
) => {
  return useQuery({
    queryKey: ["assignments-available-for-review", level],
    queryFn: () => WaniKaniAPI.getAssignmentsAvailForReview(level ?? 0),
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
