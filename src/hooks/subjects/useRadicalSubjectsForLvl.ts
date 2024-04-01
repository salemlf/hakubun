import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../../services/MiscService/MiscService";
import { Radical } from "../../types/Subject";
import { subjectKeys } from "./subjectsKeyFactory";

export const useRadicalSubjectsForLvl = (level: number) => {
  return useQuery({
    queryKey: subjectKeys.radicalsByLvl(level),
    queryFn: () => WaniKaniAPI.getRadicalSubjectsByLevel(level),
    select: (pagedData) => {
      const flattened: Radical[] = flattenData(pagedData.data) as Radical[];

      const radsUpdated = flattened.reduce(function (
        filtered: Radical[],
        subject: Radical
      ) {
        const updatedSubj = setSubjectAvailImgs(subject);
        filtered.push(updatedSubj as Radical);

        return filtered;
      }, []);

      const noLoneRadicalsAllowed = radsUpdated.filter(
        (radical: Radical) => radical.amalgamation_subject_ids.length !== 0
      );
      return noLoneRadicalsAllowed;
    },
    // stale time of an hour
    staleTime: 60 * (60 * 1000),
    // garbage collection time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
