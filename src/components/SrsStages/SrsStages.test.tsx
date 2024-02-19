import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import { createWrapper, renderWithClient } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { SRS_STAGES, assignmentsEndpoint } from "../../testing/endpoints";
import { SrsLevelName } from "../../types/MiscTypes";
import { useAssignmentsByStage } from "../../hooks/useAssignmentsByStage";
import SrsStages from ".";

test("SrsStages renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const ensureSrsQueryErrState = async (srsStage: SrsLevelName) => {
  const { result } = renderHook(() => useAssignmentsByStage(srsStage), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current.isError).toBe(true);
  });
  await waitFor(() => {
    expect(result.current.data).toBe(undefined);
  });
};

test("Shows error text on API error and no cached data", async () => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const stages = url.searchParams.get(SRS_STAGES);
      const started = url.searchParams.get("started");
      if (stages && started == "true") {
        return HttpResponse.error();
      }
      return passthrough();
    })
  );

  const stages: SrsLevelName[] = [
    "apprentice",
    "guru",
    "master",
    "enlightened",
    "burned",
  ];

  renderComponent();

  stages.forEach(async (stage) => {
    await ensureSrsQueryErrState(stage);
  });

  const errButton = await screen.findByTestId("srs-stages-err");
  expect(errButton).toHaveTextContent("Error loading data");
});

// TODO: add test
test.todo(
  "Displays error toast if API error and no cached data",
  async () => {}
);

const renderComponent = () => {
  return renderWithClient(<SrsStages />);
};
