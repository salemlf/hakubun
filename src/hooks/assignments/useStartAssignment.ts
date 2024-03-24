import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import useForecastTotalsStoreFacade from "../../stores/useForecastTotalsStore/useForecastTotalsStore.facade";
import { assignmentKeys } from "./assignmentsKeyFactory";
import { userKeys } from "../user/userKeyFactory";

type Props = {
  assignmentID: number;
};

export const useStartAssignment = () => {
  const queryClient = useQueryClient();
  // used so review forecast data will update after starting an assignment
  const { resetAll: resetForecastTotals } = useForecastTotalsStoreFacade();

  return useMutation({
    mutationFn: ({ assignmentID }: Props) => startAssignment(assignmentID),
    onSettled: () => {
      // refreshing user data in case they leveled up
      queryClient.invalidateQueries({
        queryKey: userKeys.userInfo(),
      });

      resetForecastTotals();
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.all,
      });
    },
  });
};

const startAssignment = (assignmentID: number) => {
  return WaniKaniAPI.startAssignment(assignmentID);
};
