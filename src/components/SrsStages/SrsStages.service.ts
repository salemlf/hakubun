import { groupDataByProperty } from "../../utils";
import { Assignment } from "../../types/Assignment";
import { ALL_SUBJECT_TYPES } from "../../constants";
import { AssignmentTypeGroupCount } from "./SrsStages.types";

export const countAssignmentTypesInSrsStage = (
  assignments: Assignment[]
): AssignmentTypeGroupCount => {
  const assignmentsBySubjType = groupDataByProperty(
    assignments,
    "subject_type"
  );

  // setting missing assignment types to empty arrays
  ALL_SUBJECT_TYPES.forEach((assignmentType) => {
    if (!(assignmentType in assignmentsBySubjType)) {
      assignmentsBySubjType[assignmentType as keyof object] = [];
    }
  });

  const countedWithSubjType = countWithDisplayName(assignmentsBySubjType);
  return countedWithSubjType;
};

const countWithDisplayName = (assignmentTypeGroups: any) => {
  const assignmentTypeCounts = Object.keys(assignmentTypeGroups).map((key) => {
    return { [key]: assignmentTypeGroups[key].length };
  });
  return Object.assign({}, ...assignmentTypeCounts);
};
