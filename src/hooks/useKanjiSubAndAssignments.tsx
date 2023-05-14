import { useCallback, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

const mergeKanjiData = (data: any) => {
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

  let merged = mergeById(assignArr, subjArr);
  return merged;
};

// TODO: increase time to wait between data fetches
export const useKanjiSubAndAssignments = (level: any) => {
  let kanjiResponse = useQueries({
    queries: [
      {
        queryKey: ["kanji-assignments-for-lvl-dependent", level],
        queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
        enabled: !!level,
        select: useCallback(
          (data: any) => {
            let flattened = data.data.map((elem: any) => {
              elem = Object.assign({}, elem, elem.data);
              delete elem.data;
              return elem;
            });

            return flattened;
          },
          [level]
        ),
      },
      {
        queryKey: ["kanji-subjects-for-lvl-dependent", level],
        queryFn: () => WaniKaniAPI.getKanjiSubjectsByLevel(level),
        enabled: !!level,
        select: useCallback(
          (data: any) => {
            let flattened = data.data.map((elem: any) => {
              elem = Object.assign({}, elem, elem.data);
              delete elem.data;
              return elem;
            });

            return flattened;
          },
          [level]
        ),
      },
    ],
  });

  const kanjiDataLoading = kanjiResponse.some((p) => p.isLoading);
  const data = kanjiResponse.map((p) => p.data);

  let assignments: Assignment[] | undefined = data[0];
  let subjects: Subject[] | undefined = data[1];
  let kanjiData = useMemo(() => mergeKanjiData(data), [assignments, subjects]);

  return { kanjiDataLoading, kanjiData };
};
