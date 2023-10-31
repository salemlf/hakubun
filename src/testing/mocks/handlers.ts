import { baseUrl } from "../../api/ApiConfig";

// TODO: use this endpoint in KanjiForLevelCard test
export const kanjiAssignmentsByLvlEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "gi"
);

export const kanjiSubjectsByLvlEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "gi"
);

export const subjsBySubjIDsEndpoint = new RegExp(
  `${baseUrl}subjects\?ids=[0-9]+(,[0-9]+)*`,
  "gi"
);

// TODO: remove this and rename file? just use this file to export endpoints
export const handlers = [];
