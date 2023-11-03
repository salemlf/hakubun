import { rest } from "msw";
import { baseUrl } from "../../api/ApiConfig";

export const assignmentsAvailForReviewEndpoint = new RegExp(
  `${baseUrl}assignments?immediately_available_for_review`,
  "i"
);

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

const sentryEndpointRegex = /https:\/\/.*sentry\.io\/api\/.*/;

export const handlers = [
  // allowing sentry endpoint
  rest.post(sentryEndpointRegex, (req, res, ctx) => {
    return req.passthrough();
  }),
  // test msw is functioning
  rest.get(/.*\/msw-test/, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "msw-test",
      })
    );
  }),
];
