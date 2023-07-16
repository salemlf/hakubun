import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { StudyMaterialPostData } from "../../types/MiscTypes";

type Props = {
  studyMaterialsData: StudyMaterialPostData;
};

export const useCreateStudyMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studyMaterialsData }: Props) =>
      WaniKaniAPI.postStudyMaterials(studyMaterialsData),

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["study-materials-by-subj-ids"]);
    },
  });
};
