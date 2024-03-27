import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import useForecastTotalsStoreFacade from "../../stores/useForecastTotalsStore/useForecastTotalsStore.facade";
import { ReviewPostItem } from "../../types/Review";
import { assignmentKeys } from "./assignmentsKeyFactory";
import { userKeys } from "../user/userKeyFactory";

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
    onSettled: (data) => {
      resetForecastTotals();

      // refreshing user data in case they leveled up
      queryClient.invalidateQueries({
        queryKey: userKeys.userInfo(),
      });

      queryClient.invalidateQueries({
        queryKey: assignmentKeys.all,
      });
    },
  });
};
