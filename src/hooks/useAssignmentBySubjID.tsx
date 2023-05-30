// import React from 'react'
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenCollectionOfOne } from "../services/MiscService";
import { Assignment } from "../types/Assignment";

// TODO: this returns a collection, need to flatten it and just return an object?
export const useAssignmentBySubjID = (id: number | string) => {
  return useQuery({
    queryKey: ["assignment-by-id", id],
    queryFn: () => WaniKaniAPI.getAssignmentBySubjID(id),
    enabled: !!id,
    select: useCallback(
      (data: any) => {
        if (data.data.length) {
          return flattenCollectionOfOne(data) as unknown as Assignment;
        }
        return undefined;
      },

      [id]
    ),
  });
};
