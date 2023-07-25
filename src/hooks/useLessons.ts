import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

type Props = {
  level: number | undefined;
};

// TODO: increase time to wait between data fetches
export const useLessons = ({ level }: Props) => {
  return useQuery({
    queryKey: ["available-lessons", level],
    queryFn: WaniKaniAPI.getLessons,
    enabled: !!level,
    select: (data) => data.data,
  });
};
