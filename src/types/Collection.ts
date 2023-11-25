import { PreFlattenedAssignment } from "./Assignment";
import { PreflattenedStudyMaterial } from "./StudyMaterial";
import { PreFlattenedSubject } from "./Subject";

type PagesObj = {
  per_page: number;
  next_url: string | null;
  previous_url: string | null;
};

export interface Collection {
  object: string;
  url: string;
  data_updated_at: Date | null;
  data: any[];
  pages: PagesObj;
  total_count: number;
}

export interface AssignmentCollection extends Collection {
  data: PreFlattenedAssignment[];
}

export interface SubjectCollection extends Collection {
  data: PreFlattenedSubject[];
}

export interface StudyMaterialCollection extends Collection {
  data: PreflattenedStudyMaterial[];
}
