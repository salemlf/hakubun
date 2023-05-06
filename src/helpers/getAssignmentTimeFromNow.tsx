import { Assignment } from "../types/Assignment";

export const getAssignmentTimeFromNow = (assignments: Assignment[]) => {
  // TODO: return info for each assignment where time now is subtracted from available_at to get hours/mins/days estimate
  //   return Object.values(assignments).reduce(
  //     (acc, item) => {
  //       acc.passed += item.passed_at !== null ? 1 : 0;
  //       acc.total += 1;
  //       return acc;
  //     },
  //     { passed: 0, total: 0 }
  //   );
};
