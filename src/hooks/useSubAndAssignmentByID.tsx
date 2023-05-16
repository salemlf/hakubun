import { useCallback, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import { WaniKaniAPI } from "../api/WaniKaniApi";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";
import { SubjAndAssignment } from "../types/MiscTypes";

import { mergeSubjAndAssignmentData } from "../services/SubjectAndAssignmentService";
import { setSubjectAvailImgs } from "../services/ImageSrcService";

// TODO: increase time to wait between data fetches
export const useSubAndAssignmentByID = (id: string) => {
  console.log(
    "🚀 ~ file: useSubAndAssignmentByID.tsx:14 ~ useSubAndAssignmentByID ~ id:",
    id
  );

  let subjAssignResponse = useQueries({
    queries: [
      {
        queryKey: ["assignment-by-id-dependent", id],
        queryFn: () => WaniKaniAPI.getAssignmentBySubjID(id),
        enabled: !!id,
        select: useCallback(
          (data: any) => {
            let assignDetails = data.data[0].data;
            let assignInfo = data.data[0];

            delete assignInfo.data;
            delete assignInfo.object;

            let assignObj = Object.assign({}, assignInfo, assignDetails);
            let flattened = [assignObj];

            return flattened;
          },
          [id]
        ),
      },
      {
        queryKey: ["subject-by-id-dependent", id],
        queryFn: () => WaniKaniAPI.getSubjectByID(id),
        enabled: !!id,
        select: useCallback(
          (data: any) => {
            let subjInfo = data;
            console.log(
              "🚀 ~ file: useSubAndAssignmentByID.tsx:48 ~ useSubAndAssignmentByID ~ subjInfo:",
              subjInfo
            );

            let subjDetails = setSubjectAvailImgs(data.data);

            delete subjInfo.data;

            let subjObj = Object.assign({}, subjDetails, subjInfo);
            let flattened = [subjObj];

            return flattened;
          },
          [id]
        ),
      },
    ],
  });

  const subjAssignDataLoading = subjAssignResponse.some((p) => !p.isLoading);

  const subjAssignDataSuccess = subjAssignResponse.every((p) => p.isSuccess);

  const data = subjAssignResponse.map((p) => p.data);

  let assignments: Assignment[] | undefined = data[0];
  let subjects: Subject[] | undefined = data[1];
  let subjAssignArr = useMemo(
    () => mergeSubjAndAssignmentData(data),
    [assignments, subjects]
  );

  let subjAssignData = subjAssignArr[0] || undefined;

  return { subjAssignDataLoading, subjAssignDataSuccess, subjAssignData };
};
