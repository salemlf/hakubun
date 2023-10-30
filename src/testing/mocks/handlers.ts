import { baseUrl } from "../../api/ApiConfig";

// TODO: use this endpoint in KanjiForLevelCard test
const kanjiAssignmentsEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "gi"
);

const subjsBySubjIDsEndpoint = new RegExp(
  `${baseUrl}subjects\?ids=[0-9]+(,[0-9]+)*`,
  "gi"
);

// TODO: create and use mock zustand
export const handlers = [];
