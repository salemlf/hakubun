import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useNumReviews = (level: any) => {
  return useQuery({
    queryKey: ["available-num-reviews", level],
    queryFn: WaniKaniAPI.getNumReviews,
    enabled: !!level,
  });
};
