import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { WaniKaniAPI } from "../api/WaniKaniApi";

// TODO: increase time to wait between data fetches
export const useSubjectsCurrLevel = (level: any) => {
  return useQuery({
    queryKey: ["subjects-curr-lvl", level],
    queryFn: () => WaniKaniAPI.getSubjectsByLevel(level),
    enabled: !!level,
    select: useCallback(
      (data: any) => {
        let flattened = data.data.map((elem: any) => {
          elem = Object.assign({}, elem, elem.data);
          delete elem.data;
          return elem;
        });

        let subjectsUpdated = flattened.reduce(function (
          filtered: any,
          subject: any
        ) {
          if (subject.object == "radical") {
            let availableImages =
              subject.character_images
                ?.filter((image: any) => image.content_type === "image/png")
                .map((image: any) => image.url) || null;

            // TODO: omg ewew, please actually do this for realz
            subject.selectedImage = availableImages![0];
            subject.fallbackImage = availableImages![1];
          }
          filtered.push(subject);

          return filtered;
        },
        []);

        return subjectsUpdated;
      },
      [level]
    ),
  });
};
