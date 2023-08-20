import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

type Props = {
  assignmentID: number;
};

export const useStartAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentID }: Props) => startAssignment(assignmentID),

    // TODO: this invalidation isn't working for some reason, fix
    onSuccess: (data, variables, context) => {
      // by returning instead of just calling, we keep query in a loading state while queries are invalidated
      return queryClient.invalidateQueries([
        "assignments-by-subj-ids",
        "assignments-available-for-review",
      ]);
    },
  });
};

const startAssignment = (assignmentID: number) => {
  return WaniKaniAPI.startAssignment(assignmentID);
};
