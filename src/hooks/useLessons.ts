import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

// TODO: increase time to wait between data fetches
export const useLessons = () => {
  return useQuery({
    queryKey: ["available-lessons"],
    queryFn: WaniKaniAPI.getLessons,
    select: (data) => flattenData(data),
  });
};
