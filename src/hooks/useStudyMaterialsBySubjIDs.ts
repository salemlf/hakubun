import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenCollectionOfOne, flattenData } from "../services/MiscService";
import { StudyMaterial } from "../types/MiscTypes";

export const useStudyMaterialsBySubjIDs = (subjIDs: number[]) => {
  return useQuery({
    queryKey: ["study-materials-by-subj-ids", subjIDs],
    queryFn: () => WaniKaniAPI.getStudyMaterialsBySubjIDs(subjIDs),
    enabled: !!subjIDs,
    select: useCallback(
      (data: any) => {
        if (data.data.length === 1) {
          return flattenCollectionOfOne(data) as unknown as StudyMaterial;
        }
        return flattenData(data);
      },
      [subjIDs]
    ),
  });
};
