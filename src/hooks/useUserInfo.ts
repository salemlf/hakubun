import { WaniKaniAPI } from "../api/WaniKaniApi";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: WaniKaniAPI.getUser,
    // stale time of 4 hours
    staleTime: 4 * 60 * (60 * 1000),
    // cache time of 5 hours
    cacheTime: 5 * 60 * (60 * 1000),
  });
};
