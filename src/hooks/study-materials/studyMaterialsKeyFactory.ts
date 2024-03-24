export const studyMaterialKeys = {
  all: ["study-materials"] as const,
  bySubjID: (id: number) =>
    [...studyMaterialKeys.all, "by-subj-id", id] as const,
  bySubjIDs: (ids: number[]) =>
    [...studyMaterialKeys.all, "by-subj-ids", ids] as const,
};
