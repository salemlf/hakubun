import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { StudyMaterialPostData } from "../types/StudyMaterial";

type Props = {
  studyMaterialsData: StudyMaterialPostData;
};

export const useCreateStudyMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studyMaterialsData }: Props) =>
      WaniKaniAPI.postStudyMaterials(studyMaterialsData),

    onSuccess: () => {
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries({
        queryKey: ["study-materials-by-subj-ids"],
      });
    },
  });
};
