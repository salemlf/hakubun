import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenData } from "../../services/MiscService/MiscService";
import { StudyMaterial } from "../../types/StudyMaterial";
import { studyMaterialKeys } from "./studyMaterialsKeyFactory";

export const useStudyMaterialsBySubjIDs = (
  subjIDs: number[],
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: studyMaterialKeys.bySubjIDs(subjIDs),
    queryFn: () => WaniKaniAPI.getStudyMaterialsBySubjIDs(subjIDs),
    enabled: enabled && subjIDs.length !== 0,
    select: (collectionData) => {
      const flattenedData: StudyMaterial[] = flattenData(
        collectionData.data,
        false
      );
      return flattenedData;
    },
  });
};
