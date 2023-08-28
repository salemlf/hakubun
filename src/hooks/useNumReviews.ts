import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: delete and just use getAssignmentsAvailForReview count
export const useNumReviews = (level: any) => {
  return useQuery({
    queryKey: ["available-num-reviews", level],
    queryFn: WaniKaniAPI.getNumReviews,
    enabled: !!level,
  });
};
