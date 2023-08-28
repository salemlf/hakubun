import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";

export const useAssignmentsAvailableInRange = (
  startDateIsoString: string,
  endDateIsoString: string
) => {
  return useQuery({
    queryKey: ["assignments-available-in-range"],
    enabled: !!endDateIsoString && !!startDateIsoString,
    queryFn: () =>
      WaniKaniAPI.getAssignmentsAvailableInRange(
        startDateIsoString,
        endDateIsoString
      ),
    select: (data) => flattenData(data),
  });
};
