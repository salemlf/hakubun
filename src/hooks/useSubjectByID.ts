import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService";

export const useSubjectByID = (id: number) => {
  return useQuery({
    queryKey: ["subject-by-id", id],
    queryFn: () => WaniKaniAPI.getSubjectByID(id),
    enabled: !!id,
    select: useCallback(
      (data: any) => {
        let flattened = Object.assign({}, data, data.data);
        delete flattened.data;

        let subjWithImgInfo = setSubjectAvailImgs(flattened);
        return subjWithImgInfo;
      },
      [id]
    ),
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // cache time of 1hr 15 minutes
    cacheTime: 75 * (60 * 1000),
  });
};
