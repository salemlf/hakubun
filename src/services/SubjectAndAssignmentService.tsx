import { ReadingType, Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import { convertToUpperCase } from "./MiscService";

export const getAssignmentStatuses = (assignments: Assignment[]) => {
  return Object.values(assignments).reduce(
    (acc, item) => {
      acc.passed += item.passed_at !== null ? 1 : 0;
      acc.total += 1;
      return acc;
    },
    { passed: 0, total: 0 }
  );
};

export const getSubjectDisplayName = (subj: Subject) => {
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:21 ~ getSubjectDisplayName ~ subj:",
    subj
  );
  let subjType = subj["object"];

  if (subjType === "radical") {
    return convertToUpperCase(subj["slug" as keyof {}]);
  } else {
    let primary = subj["meanings"]?.filter(
      (meaning: any) => meaning.primary === true
    );

    return primary ? primary[0].meaning : "";
  }
};

export const getAlternativeMeanings = (subj: Subject) => {
  return subj["meanings"]?.filter((meaning: any) => meaning.primary === false);
};

export const getKanjiReadings = (subj: Subject, readingType: ReadingType) => {
  let readings = subj["readings"]?.filter(
    (reading: any) => reading.type === readingType
  );
  readings = readings.sort((a, b) => (a.primary === true ? 1 : -1));
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:44 ~ getKanjiReadings ~ readings:",
    readings
  );

  return readings;
};

export const isAssignmentLocked = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  return findAssignmentWithSubjID(assignmentsData, subject) === undefined;
};

export const findAssignmentWithSubjID = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  return assignmentsData.find(
    (assignment: Assignment) => assignment.subject_id === subject.id
  );
};
