import { AssignmentSortOption } from "./SortOrderOption.types";
import { Assignment } from "../../types/Assignment";
import { Subject } from "../../types/Subject";
import { SORT_OPTIONS } from "./SortOrderOption.constants";
import {
  sortAssignmentsByAvailableDate,
  sortAssignmentsByLevel,
  sortAssignmentsBySrsStage,
  sortAssignmentsByDateUpdated,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { shuffleArray } from "../../services/MiscService/MiscService";

export const getSortOrderOptionById = (id: string): AssignmentSortOption => {
  // we know it'll always exist because we're using the SORT_OPTIONS constant as a data source
  return SORT_OPTIONS.find((option) => option.id === id)!;
};

const sortFunctionMap = {
  "available date": sortAssignmentsByAvailableDate,
  level: sortAssignmentsByLevel,
  "srs stage": sortAssignmentsBySrsStage,
  shuffled: shuffleArray,
  "date updated": sortAssignmentsByDateUpdated,
};

export const sortAssignmentsWithOption = (
  assignmentData: Assignment[],
  sortOption: AssignmentSortOption,
  subjData: Subject[]
): Assignment[] => {
  return sortFunctionMap[sortOption.option](
    assignmentData,
    sortOption.order,
    subjData
  );
};
