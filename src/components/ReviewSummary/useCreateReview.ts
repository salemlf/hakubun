import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { ReviewPostData } from "../../types/ReviewSessionTypes";

// TODO: create function in WaniKaniAPI that posts data in this format
// body: {
//     "review": {
//       "assignment_id": 1422,
//       "incorrect_meaning_answers": 1,
//       "incorrect_reading_answers": 2,
//       "created_at": "2017-09-30T01:42:13.453291Z"
//     }
//   }

type Props = {
  reviewSessionData: ReviewPostData[];
};

export const useCreateStudyMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewSessionData }: Props) =>
      WaniKaniAPI.postReview(reviewSessionData),

    onSuccess: (data, variables, context) => {
      // *testing
      console.log(
        "🚀 ~ file: useCreateReview.ts:26 ~ useCreateStudyMaterials ~ data:",
        data
      );
      // *testing
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries(["create-review-post"]);
    },
  });
};
