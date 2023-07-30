import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { ReviewPostData } from "../../types/ReviewSessionTypes";

type Props = {
  reviewSessionData: ReviewPostData[];
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewSessionData }: Props) =>
      WaniKaniAPI.postReview(reviewSessionData),

    onSuccess: (data, variables, context) => {
      // *testing
      console.log(
        "🚀 ~ file: useCreateReview.ts:16 ~ useCreateReview ~ data:",
        data
      );
      // *testing
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries(["create-review-post"]);
    },
  });
};
