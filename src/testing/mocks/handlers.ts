import { HttpResponse, http, passthrough } from "msw";

const sentryEndpointRegex = /https:\/\/.*sentry\.io\/api\/.*/;

export const handlers = [
  // allowing sentry endpoint
  http.post(sentryEndpointRegex, () => {
    return passthrough();
  }),
  // test msw is functioning
  http.get(/.*\/msw-test/, () => {
    return HttpResponse.json({
      name: "msw-test",
    });
  }),
];
