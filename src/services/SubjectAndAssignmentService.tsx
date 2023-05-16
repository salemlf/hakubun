import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";
import { SubjAndAssignment } from "../types/MiscTypes";

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

const convertToUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getSubjectDisplayName = (subj: SubjAndAssignment) => {
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

export const getAlternativeMeanings = (subj: SubjAndAssignment) => {
  let alternatives = subj["meanings"]?.filter(
    (meaning: any) => meaning.primary === false
  );

  return alternatives;
};

export const mergeSubjAndAssignmentData = (data: any) => {
  let assignArr: Assignment[] = data[0];
  let subjArr: Subject[] = data[1];

  if (!assignArr || !subjArr) {
    return [];
  }
  const mergeById = (assignments: any, subjects: any) =>
    assignments.map((assignment: any) => ({
      ...subjects.find(
        (subject: any) => subject.id === assignment.subject_id && subject
      ),
      ...assignment,
    }));

  let merged: SubjAndAssignment[] = mergeById(assignArr, subjArr);
  return merged;
};
