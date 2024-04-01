import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { Assignment, PreFlattenedAssignment } from "../../types/Assignment";
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
      const preFlattenedAssignments: PreFlattenedAssignment[] =
        pagedData.data as PreFlattenedAssignment[];
      const flattenedData: Assignment[] = flattenData(
        preFlattenedAssignments
      ) as Assignment[];
      return flattenedData;
    },
  });
};
