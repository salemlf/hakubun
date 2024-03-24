import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { StudyMaterial, StudyMaterialPutBody } from "../../types/StudyMaterial";
import { studyMaterialKeys } from "./studyMaterialsKeyFactory";

type Props = {
  studyMaterialID: number;
  updatedStudyMaterials: StudyMaterial;
};

export const useUpdateStudyMaterials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studyMaterialID, updatedStudyMaterials }: Props) =>
      updateStudyMaterials(studyMaterialID, updatedStudyMaterials),

    onSuccess: () => {
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries({
        queryKey: studyMaterialKeys.all,
      });
    },
  });
};

const updateStudyMaterials = (
  studyMaterialID: number,
  updatedStudyMaterials: StudyMaterial
) => {
  const { created_at, hidden, subject_id, subject_type, ...studyMaterialBody } =
    updatedStudyMaterials;
  const materialDataBody = {
    study_material: studyMaterialBody,
  } as StudyMaterialPutBody;

  return WaniKaniAPI.putStudyMaterialsByMaterialID(
    studyMaterialID,
    materialDataBody
  );
};
