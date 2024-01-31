import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import { renderWithRouter, createWrapper } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import {
  SUBJECT_SUBJ_TYPES,
  LEVELS_PARAM,
  assignmentsEndpoint,
  subjectsEndpoint,
  ASSIGNMENT_SUBJ_TYPES,
} from "../../testing/endpoints";
import { useRadicalSubjectsForLvl } from "../../hooks/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/useRadicalAssignmentsForLvl";
import { SubjectDetails } from "../../pages/SubjectDetails";
import RadicalsForLvlCard from ".";

const mockLevel = 1;

test("RadicalsForLvlCard renders", () => {
  const { baseElement } = renderComponent(mockLevel);
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

  renderComponent(mockLevel, true);

  const { result: subjectsResult } = renderHook(
    () => useRadicalSubjectsForLvl(mockLevel),
    {
      wrapper: createWrapper(),
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
      wrapper: createWrapper(),
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

const renderComponent = (
  level: number,
  withSubjectDetails: boolean = false
) => {
  const routes = withSubjectDetails
    ? [{ element: <SubjectDetails />, path: "/subjects/:id" }]
    : [];
  return renderWithRouter({
    routeObj: {
      element: <RadicalsForLvlCard level={level} />,
      path: "/",
    },
    routes,
  });
};
