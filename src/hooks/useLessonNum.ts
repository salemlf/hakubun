import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

type Props = {
  level: number | undefined;
};

// TODO: increase time to wait between data fetches
export const useNumLessons = ({ level }: Props) => {
  return useQuery({
    queryKey: ["available-num-lessons", level],
    queryFn: WaniKaniAPI.getNumLessons,
    enabled: !!level,
  });
};
