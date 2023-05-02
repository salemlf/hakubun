import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useRadicalSubjectsForLvl = (level: any) => {
  return useQuery({
    queryKey: ["radical-subjects-for-lvl", level],
    queryFn: () => WaniKaniAPI.getRadicalSubjectsByLevel(level),
    enabled: !!level,
    // TODO: simply this further
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        let radsUpdated = flattened.reduce(function (
          filtered: any,
          subject: any
        ) {
          if (subject.characters == null) {
            let availableImages =
              subject.character_images
                ?.filter((image: any) => image.content_type === "image/png")
                .map((image: any) => image.url) || null;

            subject.availableImages = availableImages;
            subject.useImage = true;
          } else {
            subject.useImage = false;
          }
          filtered.push(subject);

          return filtered;
        },
        []);
        return radsUpdated;
      },
      [level]
    ),
  });
};
