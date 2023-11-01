import { rest } from "msw";
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

const sentryEndpointRegex = /https:\/\/.*sentry\.io\/api\/.*/;

export const handlers = [
  // allowing sentry endpoint
  rest.post(sentryEndpointRegex, (req, res, ctx) => {
    return req.passthrough();
  }),
];
