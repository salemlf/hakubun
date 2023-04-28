import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useReviews = (level: any) => {
  return useQuery({
    queryKey: ["available-reviews", level],
    queryFn: WaniKaniAPI.getReviews,
    enabled: !!level,
    select: (data) => data.data,
  });
};
