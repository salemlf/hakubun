import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { Subject } from "../types/Subject";

// TODO: increase time to wait between data fetches
export const useKanjiSubAndAssignments = (level: any) => {
  // TODO: change this, it's an icky mess
  //   let dependencies = needsRelatedSubj ? !!level && !!relatedSubjs : !!level;
  let kanjiResponse = useQueries({
    queries: [
      {
        queryKey: ["kanji-assignments-for-lvl-dbl", level],
        queryFn: () => WaniKaniAPI.getKanjiAssignmentsByLvl(level),
        // enabled: !!level && !!relatedSubjs,
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
        queryKey: ["kanji-subjects-for-lvl-dbl", level],
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

  //   TODO: memoize?
  let mergeKanjiData = () => {
    const mergeById = (a1: any, a2: any) =>
      a1.map((assignment: any) => ({
        ...a2.find(
          (subject: any) => subject.id === assignment.subject_id && subject
        ),
        ...assignment,
      }));

    let merged = mergeById(data[0], data[1]);
    return merged;
  };

  let kanjiData = kanjiDataLoading ? [] : mergeKanjiData();

  //   console.log(
  //     "🚀 ~ file: useKanjiSubAndAssignments.tsx:60 ~ useKanjiSubAndAssignments ~ kanjiData:",
  //     kanjiData
  //   );

  return { kanjiDataLoading, kanjiData };
};
