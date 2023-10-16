import { groupDataByProperty } from "../../utils";
import { getSubjectTypeDisplayText } from "../../services/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { SubjectType } from "../../types/Subject";
import { ALL_ASSIGNMENT_TYPES } from "../../constants";

export const countAssignmentTypesInSrsStage = (assignments: Assignment[]) => {
  let assignmentsBySubjType = groupDataByProperty(assignments, "subject_type");

  // *testing
  console.log(
    "🚀 ~ file: SrsStages.service.ts:11 ~ assignmentsBySubjType:",
    assignmentsBySubjType
  );
  // *testing

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
};

const countWithDisplayName = (assignmentTypeGroups: any) => {
  const assignmentTypeCounts = Object.keys(assignmentTypeGroups).map((key) => {
    const assignmentTypeKey =
      getSubjectTypeDisplayText(key as SubjectType, true) || key;
    return { [assignmentTypeKey]: assignmentTypeGroups[key].length };
  });
  return Object.assign({}, ...assignmentTypeCounts);
};
