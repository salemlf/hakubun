import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useAssignmentsAvailableInRange = (
  startDateIsoString: string,
  endDateIsoString: string,
  isEnabled: boolean
) => {
  return useQuery({
    queryKey: assignmentKeys.availableinRange(
      startDateIsoString,
      endDateIsoString
    ),
    enabled: !!isEnabled && !!endDateIsoString && !!startDateIsoString,
    queryFn: () =>
      WaniKaniAPI.getAssignmentsAvailableInRange(
        startDateIsoString,
        endDateIsoString
      ),
    select: (pagedData) => {
      const flattenedData: Assignment[] = flattenData(pagedData.data, false);
      return flattenedData;
    },
  });
};
