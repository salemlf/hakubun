import { rest } from "msw";

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
