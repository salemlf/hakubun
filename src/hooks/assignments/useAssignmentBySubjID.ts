import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenCollectionOfOne } from "../../services/MiscService/MiscService";
import { Assignment } from "../../types/Assignment";
import { AssignmentCollection } from "../../types/Collection";
import { assignmentKeys } from "./assignmentsKeyFactory";

export const useAssignmentBySubjID = (id: number) => {
  return useQuery({
    queryKey: assignmentKeys.bySubjID(id),
    queryFn: () => WaniKaniAPI.getAssignmentsBySubjIDs([id]),
    select: (collection: AssignmentCollection) => {
      if (collection.data.length) {
        return flattenCollectionOfOne(collection) as Assignment;
      }
      return undefined;
    },
  });
};
