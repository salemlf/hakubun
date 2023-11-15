import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import {
  assignmentsAvailForLessonsEndpoint,
  assignmentsEndpoint,
} from "../../testing/endpoints";
import { mockAssignmentsAvailLessonsResponse } from "../../testing/mocks/data/assignments.mock";
import { useLessons } from "../../hooks/useLessons";
import LessonSettings from "../../pages/LessonSettings";
import LessonsButton from ".";

test("LessonsButton renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("LessonsButton redirects to lesson settings on click", async () => {
  server.use(
    http.get(assignmentsAvailForLessonsEndpoint, () => {
      return HttpResponse.json(mockAssignmentsAvailLessonsResponse);
    })
  );
  const { user } = renderComponent(true);

  const { result } = renderHook(() => useLessons(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    screen.getByRole("button", {
      name: /lessons/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: /lesson settings/i,
    })
  ).toBeInTheDocument();
});

test("Shows error text on API error and no cached data", async () => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      let availForLessons = url.searchParams.get(
        "immediately_available_for_lessons"
      );
      if (availForLessons == "true") {
        return HttpResponse.error();
      }
      return passthrough();
    })
  );

  renderComponent(true);
  const { result } = renderHook(() => useLessons(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isError).toBe(true));
  await waitFor(() => expect(result.current.data).toBe(undefined));

  let errButton = await screen.findByTestId("lesson-btn-err");
  expect(errButton).toHaveTextContent("Error loading data");
});

// TODO: check that displays a toast on click if no lessons available

const renderComponent = (withLessonSettings: boolean = false) => {
  let routes = withLessonSettings
    ? [{ element: <LessonSettings />, path: "/lessons/settings" }]
    : [];
  return renderWithRouter({
    component: <LessonsButton />,
    defaultPath: "/",
    routes,
  });
};
