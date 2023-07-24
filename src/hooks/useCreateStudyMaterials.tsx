import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { StudyMaterialPostData } from "../types/MiscTypes";

type Props = {
  studyMaterialsData: StudyMaterialPostData;
};

export const useCreateStudyMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studyMaterialsData }: Props) =>
      WaniKaniAPI.postStudyMaterials(studyMaterialsData),

    onSuccess: (data, variables, context) => {
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries(["study-materials-by-subj-ids"]);
    },
  });
};
