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
import { useKanjiSubjectsForLvl } from "../../hooks/subjects/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/assignments/useKanjiAssignmentsForLvl";
import { SubjectDetails } from "../../pages/SubjectDetails";
import KanjiForLvlCard from ".";

const mockLevel = 1;

test("KanjiForLvlCard renders", () => {
  const { baseElement } = renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
});

test("Shows error text on API error and no cached data", async () => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get(LEVELS_PARAM);
      const subjTypes = url.searchParams.get(SUBJECT_SUBJ_TYPES);
      if (levels === mockLevel.toString() && subjTypes === "kanji") {
        return HttpResponse.error();
      }
      return passthrough();
    }),
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get(LEVELS_PARAM);
      const subjTypes = url.searchParams.get(ASSIGNMENT_SUBJ_TYPES);
      if (levels === mockLevel.toString() && subjTypes === "kanji") {
        return HttpResponse.error();
      }
      return passthrough();
    })
  );

  renderComponent(mockLevel, true);

  const { result: subjectsResult } = renderHook(
    () => useKanjiSubjectsForLvl(mockLevel),
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
    () => useKanjiAssignmentsForLvl(mockLevel),
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

  const errCard = await screen.findByTestId("kanji-for-lvl-err");
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
      element: <KanjiForLvlCard level={level} />,
      path: "/",
    },
    routes,
  });
};
