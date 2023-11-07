import { baseUrl } from "./../api/ApiConfig";

export const userEndpoint = `${baseUrl}user`;
export const assignmentsAvailForReviewEndpoint = `${baseUrl}assignments?immediately_available_for_review`;
export const assignmentsAvailForLessonsEndpoint = `${baseUrl}assignments?immediately_available_for_lessons=true`;

// TODO: use this endpoint in KanjiForLevelCard test
export const kanjiAssignmentsByLvlEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "i"
);

export const kanjiSubjectsByLvlEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "i"
);

export const subjsBySubjIDsEndpoint = new RegExp(
  `${baseUrl}subjects\?ids=[0-9]+(,[0-9]+)*`,
  "i"
);
