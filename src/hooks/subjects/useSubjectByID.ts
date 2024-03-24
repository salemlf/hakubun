import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../../services/ImageSrcService/ImageSrcService";
import { subjectKeys } from "./subjectsKeyFactory";

export const useSubjectByID = (id: number) => {
  return useQuery({
    queryKey: subjectKeys.bySubjID(id),
    queryFn: () => WaniKaniAPI.getSubjectByID(id),
    enabled: !!id,
    select: (data: any) => {
      const flattened = Object.assign({}, data, data.data);
      delete flattened.data;

      const subjWithImgInfo = setSubjectAvailImgs(flattened);
      return subjWithImgInfo;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // garbage collection time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
