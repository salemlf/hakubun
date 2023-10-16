import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { useForecastTotalsStore } from "../stores/useForecastTotalsStore";

type Props = {
  assignmentID: number;
};

export const useStartAssignment = () => {
  const queryClient = useQueryClient();
  // used so review forecast data will update after starting an assignment
  const resetForecastTotals = useForecastTotalsStore.use.resetAll();

  return useMutation({
    mutationFn: ({ assignmentID }: Props) => startAssignment(assignmentID),
    onSettled: (data, error, variables, context) => {
      resetForecastTotals();
      queryClient.invalidateQueries({
        queryKey: ["assignments-by-subj-ids"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-for-review"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignments-available-in-range"],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-lessons"],
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

const startAssignment = (assignmentID: number) => {
  return WaniKaniAPI.startAssignment(assignmentID);
};
