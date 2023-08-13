import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenCollectionOfOne, flattenData } from "../services/MiscService";
import { StudyMaterial } from "../types/MiscTypes";

export const useStudyMaterialsBySubjIDs = (
  subjIDs: number[],
  enabled: boolean = true,
  flattenCollection = true
) => {
  return useQuery({
    queryKey: ["study-materials-by-subj-ids", subjIDs],
    queryFn: () => WaniKaniAPI.getStudyMaterialsBySubjIDs(subjIDs),
    enabled: enabled && subjIDs.length !== 0,
    select: useCallback(
      (data: any) => {
        if (data.data.length === 1 && flattenCollection) {
          return flattenCollectionOfOne(data) as unknown as StudyMaterial;
        }
        return flattenData(data);
      },
      [subjIDs]
    ),
  });
};
