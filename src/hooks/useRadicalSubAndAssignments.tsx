import { useCallback, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import { WaniKaniAPI } from "../api/WaniKaniApi";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import { mergeSubjAndAssignmentData } from "../services/SubjectAndAssignmentService";

// TODO: increase time to wait between data fetches
export const useRadicalSubAndAssignments = (level: any) => {
  let radicalResponse = useQueries({
    queries: [
      {
        queryKey: ["radical-assignments-for-lvl-dependent", level],
        queryFn: () => WaniKaniAPI.getRadicalAssignmentsByLvl(level),
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
        queryKey: ["radical-subjects-for-lvl-dependent", level],
        queryFn: () => WaniKaniAPI.getRadicalSubjectsByLevel(level),
        enabled: !!level,
        // TODO: simply this further
        select: useCallback(
          (data: any) => {
            let flattened = data.data.map((elem: any) => {
              elem = Object.assign({}, elem, elem.data);
              delete elem.data;
              return elem;
            });

            let radsUpdated = flattened.reduce(function (
              filtered: any,
              subject: any
            ) {
              if (subject.characters == null) {
                let availableImages =
                  subject.character_images
                    ?.filter((image: any) => image.content_type === "image/png")
                    .map((image: any) => image.url) || null;

                subject.availableImages = availableImages;
                subject.useImage = true;
              } else {
                subject.useImage = false;
              }
              filtered.push(subject);

              return filtered;
            },
            []);
            return radsUpdated;
          },
          [level]
        ),
      },
    ],
  });

  const radicalDataLoading = radicalResponse.some((p) => p.isLoading);
  const data = radicalResponse.map((p) => p.data);

  let assignments: Assignment[] | undefined = data[0];
  let subjects: Subject[] | undefined = data[1];

  let radicalData = useMemo(
    () => mergeSubjAndAssignmentData(data),
    [assignments, subjects]
  );

  return { radicalDataLoading, radicalData };
};
