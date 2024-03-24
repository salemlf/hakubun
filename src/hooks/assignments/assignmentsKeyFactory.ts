export const assignmentKeys = {
  all: ["assignment"] as const,
  allAvailable: () => [...assignmentKeys.all, "s-available"] as const,
  allByLvl: () => [...assignmentKeys.all, "s-by-lvl"] as const,
  bySubjID: (id: number) => [...assignmentKeys.all, "-by-subj-id", id] as const,
  bySubjIDs: (ids: number[]) =>
    [...assignmentKeys.all, "-by-subj-ids", ids] as const,
  multipleBySubjIDs: (ids: number[]) =>
    [...assignmentKeys.all, "s-by-subj-id", ids] as const,
  availableinRange: (startDateString: string, endDateString: string) =>
    [
      ...assignmentKeys.allAvailable(),
      "-in-range",
      startDateString,
      endDateString,
    ] as const,

  reviews: () => [...assignmentKeys.allAvailable(), "-reviews"] as const,
  lessons: () => [...assignmentKeys.allAvailable(), "-lessons"] as const,
  byStage: (stage: string) =>
    [...assignmentKeys.all, "s-by-stage", stage] as const,
  kanjiByLvl: (lvl: number) =>
    [...assignmentKeys.allByLvl(), "-kanji", lvl] as const,
  radicalsByLvl: (lvl: number) =>
    [...assignmentKeys.allByLvl(), "-radicals", lvl] as const,
};
