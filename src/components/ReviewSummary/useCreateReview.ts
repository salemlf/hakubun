import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { ReviewPostItem } from "../../types/ReviewSessionTypes";

type Props = {
  reviewSessionData: ReviewPostItem;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewSessionData }: Props) =>
      WaniKaniAPI.postReview(reviewSessionData),
    onSettled: (data, error, variables, context) => {
      console.log(
        "🚀 ~ file: useCreateReview.ts:15 ~ useCreateReview ~ data:",
        data
      );
      queryClient.invalidateQueries(["assignments-available-for-review"]);
    },
  });
};
