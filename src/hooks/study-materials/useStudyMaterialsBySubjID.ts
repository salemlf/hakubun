import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { flattenCollectionOfOne } from "../../services/MiscService/MiscService";
import { StudyMaterialCollection } from "../../types/Collection";
import { StudyMaterialDataResponse } from "../../types/StudyMaterial";
import { studyMaterialKeys } from "./studyMaterialsKeyFactory";

export const useStudyMaterialsBySubjID = (
  subjID: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: studyMaterialKeys.bySubjID(subjID),
    queryFn: () => WaniKaniAPI.getStudyMaterialsBySubjIDs([subjID]),
    enabled: enabled,
    select: (collection: StudyMaterialCollection) => {
      const studyMaterialData: StudyMaterialDataResponse =
        flattenCollectionOfOne(collection);
      return studyMaterialData;
    },
  });
};
