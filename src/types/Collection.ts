import { PreFlattenedAssignment } from "./Assignment";
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
  data: CollectionItem[];
  pages: PagesObj;
  total_count: number;
}

// TODO: make data not optional?
export type CollectionItem = {
  id: number;
  object: string;
  url: string;
  data_updated_at: Date | null;
};

export type AssignmentCollectionItem = {
  id: number;
  object: string;
  url: string;
  data_updated_at: Date | null;
  data: PreFlattenedAssignment[];
};

export interface AssignmentCollection extends Collection {
  data: PreFlattenedAssignment[];
}

export type SubjectCollectionItem = {
  id: number;
  object: string;
  url: string;
  data_updated_at: Date | null;
  data: PreFlattenedSubject[];
};

export interface SubjectCollection extends Collection {
  data: SubjectCollectionItem[];
}
