import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import {
  createQueryWrapper,
  act,
  TestRoute,
  createTestRouter,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import {
  SUBJECT_SUBJ_TYPES,
  LEVELS_PARAM,
  assignmentsEndpoint,
  subjectsEndpoint,
  ASSIGNMENT_SUBJ_TYPES,
} from "../../testing/endpoints";
import { useRadicalSubjectsForLvl } from "../../hooks/subjects/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/assignments/useRadicalAssignmentsForLvl";
import RadicalsForLvlCard from ".";

const mockLevel = 1;
test("RadicalsForLvlCard renders", async () => {
  const { baseElement } = await renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
});

test("Shows error text on API error and no cached data", async () => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get(LEVELS_PARAM);
      const subjTypes = url.searchParams.get(SUBJECT_SUBJ_TYPES);
      if (levels === mockLevel.toString() && subjTypes === "radical") {
        return HttpResponse.error();
      }
      return passthrough();
    }),
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get(LEVELS_PARAM);
      const subjTypes = url.searchParams.get(ASSIGNMENT_SUBJ_TYPES);
      if (levels === mockLevel.toString() && subjTypes === "radical") {
        return HttpResponse.error();
      }
      return passthrough();
    })
  );

  await renderComponent(mockLevel, true);

  const { result: subjectsResult } = renderHook(
    () => useRadicalSubjectsForLvl(mockLevel),
    {
      wrapper: createQueryWrapper(),
    }
  );

  await waitFor(() => {
    expect(subjectsResult.current.isError).toBe(true);
  });
  await waitFor(() => {
    expect(subjectsResult.current.data).toBe(undefined);
  });

  const { result: assignmentsResult } = renderHook(
    () => useRadicalAssignmentsForLvl(mockLevel),
    {
      wrapper: createQueryWrapper(),
    }
  );

  await waitFor(() => {
    expect(assignmentsResult.current.isError).toBe(true);
  });
  await waitFor(() => {
    expect(assignmentsResult.current.data).toBe(undefined);
  });

  const errCard = await screen.findByTestId("radicals-for-lvl-err");
  expect(errCard).toHaveTextContent("Error loading data");
});

// TODO: add test
test.todo(
  "Displays error toast if API error and no cached data",
  async () => {}
);

const renderComponent = async (
  level: number,
  withSubjectDetails: boolean = false
) => {
  const radicalsForLvlPath = "/";
  const radicalsForLvlCardRoute: TestRoute = {
    component: () => <RadicalsForLvlCard level={level} />,
    path: radicalsForLvlPath,
  };

  const subjDetailsRoute: TestRoute = {
    path: "/subjects/$subjId",
    component: () => (
      <div>
        <h1>Mock Subject Details</h1>
      </div>
    ),
  };

  const routesToRender: TestRoute[] = [
    radicalsForLvlCardRoute,
    ...(withSubjectDetails ? [subjDetailsRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: radicalsForLvlPath,
    });
  });
};
