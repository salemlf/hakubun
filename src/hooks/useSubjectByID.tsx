import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService";

// TODO: increase cache time and stale time since subjects (cache time should always be > stale time)
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
        console.log(
          "🚀 ~ file: useSubjectByID.tsx:17 ~ useSubjectByID ~ subjWithImgInfo:",
          subjWithImgInfo
        );
        // return flattened;
        return subjWithImgInfo;
      },
      [id]
    ),
  });
};
