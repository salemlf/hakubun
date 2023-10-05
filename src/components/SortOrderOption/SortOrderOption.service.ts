import { AssignmentSortOption, SortOrder } from "./SortOrderOption.types";
import { Assignment } from "../../types/Assignment";
import { Subject } from "../../types/Subject";
import { SORT_OPTIONS } from "./SortOrderOption.constants";
import {
  sortAssignmentsByAvailableDate,
  sortAssignmentsByLevel,
  sortAssignmentsBySrsStage,
} from "../../services/SubjectAndAssignmentService";
import { shuffleArray } from "../../services/MiscService";

export const getSortOrderOptionById = (id: string): AssignmentSortOption => {
  // we know it'll always exist because we're using the SORT_OPTIONS constant as a data source
  return SORT_OPTIONS.find((option) => option.id === id)!;
};

// TODO: remove once no longer referenced
const noop = (assignmentData: Assignment[], sortOrder: SortOrder) => {
  console.log("noop called!");
  return assignmentData;
};

const sortFunctionMap = {
  "available date": sortAssignmentsByAvailableDate,
  // level: sortAssignmentsByLevel,
  level: sortAssignmentsByLevel,
  "srs stage": sortAssignmentsBySrsStage,
  shuffled: shuffleArray,
};

// TODO: sort by level, available date, srs stage, or shuffled.
export const sortAssignmentsWithOption = (
  assignmentData: Assignment[],
  sortOption: AssignmentSortOption,
  subjData: Subject[]
): Assignment[] => {
  console.log(
    "🚀 ~ file: SortOrderOption.service.ts:39 ~ sortOption:",
    sortOption
  );
  // console.log("🚀 ~ file: SortOrderOption.service.ts:38 ~ subjData:", subjData);
  console.log(
    "🚀 ~ file: SortOrderOption.service.ts:45 ~ sortFunctionMap[sortOption.option]:",
    sortFunctionMap[sortOption.option]
  );
  return sortFunctionMap[sortOption.option](
    assignmentData,
    sortOption.order,
    subjData
  );
  // console.log(
  //   "🚀 ~ file: SortOrderOption.service.ts:45 ~ sortedData:",
  //   sortedData
  // );
  // return sortedData;
};
