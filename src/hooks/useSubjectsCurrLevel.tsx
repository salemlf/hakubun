import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useSubjectsCurrLevel = (
  level: any,
  onSuccess: any,
  onError: any
) => {
  return useQuery({
    queryKey: ["subjects-curr-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    enabled: !!level,
    onSuccess,
    onError,
    select: (data) =>
      data.data.map((elem: any) => {
        elem = Object.assign({}, elem, elem.data);
        delete elem.data;
        return elem;
      }),
  });
};
