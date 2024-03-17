import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { setSubjectAvailImgs } from "../services/ImageSrcService/ImageSrcService";
import { flattenData } from "../services/MiscService/MiscService";
import { Radical } from "../types/Subject";

export const useRadicalSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalSubjectsByLevel(level),
    enabled: !!level,
    select: (data: any) => {
      const flattened: Radical[] = flattenData(data);

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
    // cache time of 1hr 15 minutes
    gcTime: 75 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
};
