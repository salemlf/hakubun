import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import useForecastTotalsStoreFacade from "../stores/useForecastTotalsStore/useForecastTotalsStore.facade";
import { ReviewPostItem } from "../types/Review";

type Props = {
  reviewSessionData: ReviewPostItem;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  // used so review forecast data will update after creating a review
  const { resetAll: resetForecastTotals } = useForecastTotalsStoreFacade();

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

      // refreshing user data in case they leveled up
      queryClient.invalidateQueries({
        queryKey: ["user-info"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-for-review"],
      });
      queryClient.invalidateQueries({ queryKey: ["available-num-reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-in-range"],
      });
      // refreshing data for radical and kanji assignments on home page
      queryClient.invalidateQueries({
        queryKey: ["radical-assignments-for-lvl"],
      });
      queryClient.invalidateQueries({
        queryKey: ["kanji-assignments-for-lvl"],
      });
    },
  });
};
