import { rest } from "msw";
import { renderHook, waitFor, createWrapper } from "../testing/test-utils";
import { server } from "../testing/mocks/server";
import { baseUrl } from "../api/ApiConfig";
import { useCreateReview } from "./useCreateReview";

// TODO: test that attempt is made to resubmit review if it fails
describe("useCreateReview", () => {
  it("Tests responses when creating reviews", async () => {
    const reviewsEndpoint = `${baseUrl}reviews`;
    server.use(
      rest.post(reviewsEndpoint, (req, res, ctx) => {
        return res(ctx.status(429), ctx.json([]));
      })
    );

    test("Returns a too many requests error when submitting reviews", async () => {
      const { result } = renderHook(() => useCreateReview(), {
        wrapper: createWrapper(),
      });
      await waitFor(() => expect(result.current.isError).toBe(true));
      await waitFor(() => expect(result.current.status).toBe(429));
    });
  });
});