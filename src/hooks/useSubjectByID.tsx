import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

export const useSubjectByID = (id: string) => {
  return useQuery({
    queryKey: ["subject-by-id", id],
    queryFn: () => WaniKaniAPI.getSubjectByID(id),
    enabled: !!id,
    select: useCallback(
      (data: any) => {
        let flattened = Object.assign({}, data, data.data);
        delete flattened.data;
        return flattened;
      },
      [id]
    ),
  });
};
