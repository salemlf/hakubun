export const subjectKeys = {
  all: ["subject"] as const,
  completeList: () => [...subjectKeys.all, "s-complete-list"] as const,
  allByLvl: () => [...subjectKeys.all, "s-by-lvl"] as const,
  byLvl: (level: number) => [...subjectKeys.allByLvl(), level] as const,
  bySubjID: (id: number) => [...subjectKeys.all, "-by-subj-id", id] as const,
  multiplebySubjIDs: (ids: number[]) =>
    [...subjectKeys.all, "s-by-subj-ids", ids] as const,
  kanjiByLvl: (lvl: number) =>
    [...subjectKeys.allByLvl(), "-kanji", lvl] as const,
  radicalsByLvl: (lvl: number) =>
    [...subjectKeys.allByLvl(), "-radicals", lvl] as const,
};
