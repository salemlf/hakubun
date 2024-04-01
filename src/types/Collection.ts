import { PreFlattenedAssignment } from "./Assignment";
import { PreflattenedStudyMaterial } from "./StudyMaterial";
import { PreFlattenedSubject } from "./Subject";

type PagesObj = {
  per_page: number;
  next_url: string | null;
  previous_url: string | null;
};

export interface Collection<T> {
  object: string;
  url: string;
  data_updated_at: Date | null;
  data: T[];
  pages: PagesObj;
  total_count: number;
}

export type AssignmentCollection = Collection<PreFlattenedAssignment>;

export type SubjectCollection = Collection<PreFlattenedSubject>;

export type StudyMaterialCollection = Collection<PreflattenedStudyMaterial>;
