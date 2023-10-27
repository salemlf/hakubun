// import { waitFor, renderHook } from "@testing-library/react";
// import { rest } from "msw";
// import { server } from "../testing/mocks/server";
// import { createWrapper } from "../testing/test-utils";
// import { useCreateReview } from "./useCreateReview";
// import { baseUrl } from "../api/ApiConfig";

// describe("useCreateReview", () => {
//   it("Tests responses when creating reviews", async () => {
//     const reviewsEndpoint = `${baseUrl}reviews`;
//     server.use(
//       rest.post(reviewsEndpoint, (req, res, ctx) => {
//         return res(ctx.status(429), ctx.json([]));
//       })
//     );

//     test("Returns a too many requests error when submitting reviews", async () => {
//       const { result } = renderHook(() => useCreateReview(), {
//         wrapper: createWrapper(),
//       });
//       await waitFor(() => expect(result.current.isError).toBe(true));
//       await waitFor(() => expect(result.current.status).toBe(429));
//     });
//   });
// });
