import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useLessons = (level: any) => {
  return useQuery({
    queryKey: ["available-lessons", level],
    queryFn: WaniKaniAPI.getLessons,
    enabled: !!level,
    select: (data) => data.data,
  });
};
