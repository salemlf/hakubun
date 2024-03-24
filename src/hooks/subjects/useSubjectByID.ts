import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../../services/ImageSrcService/ImageSrcService";
import { PreFlattenedSubject, Subject } from "../../types/Subject";
import { subjectKeys } from "./subjectsKeyFactory";

export const useSubjectByID = (id: number) => {
  return useQuery({
    queryKey: subjectKeys.bySubjID(id),
    queryFn: () => WaniKaniAPI.getSubjectByID(id),
    select: (data: PreFlattenedSubject) => {
      const flattened = Object.assign({}, data, data.data);
      const subjWithImgInfo: Subject = setSubjectAvailImgs(flattened);
      return subjWithImgInfo;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // garbage collection time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
