import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";

// TODO: add call to clear data for review forecast store?
// TODO: increase time to wait between data fetches

export const useAssignmentsAvailForReview = (
  level: number | undefined,
  isEnabled: boolean = true
) => {
  return useQuery({
    queryKey: ["assignments-available-for-review", level],
    queryFn: () => WaniKaniAPI.getAssignmentsAvailForReview(level ?? 0),
    select: (data) => {
      return flattenData(data);
    },
    enabled: isEnabled,
  });
};
