import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { ReviewPostItem } from "../types/ReviewSessionTypes";

type Props = {
  reviewSessionData: ReviewPostItem;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewSessionData }: Props) =>
      WaniKaniAPI.postReview(reviewSessionData),
    retry: 3,
    onSettled: (data, error, variables, context) => {
      // *testing
      console.log(
        "🚀 ~ file: useCreateReview.ts:15 ~ useCreateReview ~ data:",
        data
      );
      // *testing
      return queryClient.invalidateQueries([
        "assignments-available-for-review",
      ]);
    },
  });
};
