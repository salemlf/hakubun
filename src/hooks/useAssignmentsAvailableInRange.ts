import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService/MiscService";

export const useAssignmentsAvailableInRange = (
  startDateIsoString: string,
  endDateIsoString: string,
  isEnabled: boolean
) => {
  return useQuery({
    queryKey: [
      "assignments-available-in-range",
      startDateIsoString,
      endDateIsoString,
    ],
    enabled: !!isEnabled && !!endDateIsoString && !!startDateIsoString,
    queryFn: () =>
      WaniKaniAPI.getAssignmentsAvailableInRange(
        startDateIsoString,
        endDateIsoString
      ),
    select: (data) => flattenData(data),
  });
};
