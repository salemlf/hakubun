import { PreFlattenedAssignment } from "./Assignment";
import { PreFlattenedSubject } from "./Subject";

// TODO: add other types too
type DataObjTypes = PreFlattenedAssignment | PreFlattenedSubject;

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
}

// TODO: make data not optional?
export type CollectionItem = {
  id: number;
  object: string;
  url: string;
  data_updated_at: Date | null;
  data?: DataObjTypes[];
};
