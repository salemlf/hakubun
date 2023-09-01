import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { useForecastTotalsStore } from "../stores/useForecastTotalsStore";
import { ReviewPostItem } from "../types/AssignmentQueueTypes";

type Props = {
  reviewSessionData: ReviewPostItem;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  // used so review forecast data will update after creating a review
  const resetForecastTotals = useForecastTotalsStore.use.resetAll();

  return useMutation({
    mutationFn: ({ reviewSessionData }: Props) =>
      WaniKaniAPI.postReview(reviewSessionData),
    retry: 3,
    onSettled: (data, error, variables, context) => {
      resetForecastTotals();
      // *testing
      console.log(
        "🚀 ~ file: useCreateReview.ts:15 ~ useCreateReview ~ data:",
        data
      );
      // *testing
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-for-review"],
      });
      queryClient.invalidateQueries({ queryKey: ["available-num-reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-in-range"],
      });
    },
  });
};
