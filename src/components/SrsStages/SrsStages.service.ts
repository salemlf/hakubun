import { groupDataByProperty } from "../../utils";
import { Assignment } from "../../types/Assignment";
import { ALL_ASSIGNMENT_TYPES } from "../../constants";
import { AssignmentTypeCount } from "./SrsStages.types";

export const countAssignmentTypesInSrsStage = (
  assignments: Assignment[]
): AssignmentTypeCount => {
  let assignmentsBySubjType = groupDataByProperty(assignments, "subject_type");

  // setting missing assignment types to empty arrays
  ALL_ASSIGNMENT_TYPES.forEach((assignmentType) => {
    if (!(assignmentType in assignmentsBySubjType)) {
      assignmentsBySubjType[assignmentType as keyof {}] = [];
    }
  });

  let countedWithSubjType = countWithDisplayName(assignmentsBySubjType);
  // *testing
  console.log(
    "🚀 ~ file: SrsStages.service.ts:50 ~ countAssignmentTypesInSrsStage ~ countedWithSubjType:",
    countedWithSubjType
  );
  // *testing
  return countedWithSubjType;
};

const countWithDisplayName = (assignmentTypeGroups: any) => {
  const assignmentTypeCounts = Object.keys(assignmentTypeGroups).map((key) => {
    return { [key]: assignmentTypeGroups[key].length };
  });
  return Object.assign({}, ...assignmentTypeCounts);
};
