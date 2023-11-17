import { HttpResponse, http, passthrough } from "msw";
import {
  createWrapper,
  renderWithRouter,
  act,
  screen,
  renderHook,
  waitFor,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { AVAIL_LESSONS, assignmentsEndpoint } from "../../testing/endpoints";
import {
  mockAssignmentsAvailLessonsResponse,
  mockAssignmentsNoAvailLessonsResponse,
} from "../../testing/mocks/data/assignments.mock";
import { mockUserLvl1 } from "../../testing/mocks/data/user.mock";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { useLessons } from "../../hooks/useLessons";
import LessonSettings from "../../pages/LessonSettings";
import LessonsButton from ".";

test("LessonsButton renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const setUpUserInfo = async () => {
  const { result: userInfoResult } = renderHook(() => useUserInfoStoreFacade());
  await waitFor(() => expect(userInfoResult.current.userInfo).toBe(undefined));
  act(() => userInfoResult.current.setUserInfo(mockUserLvl1));
  await waitFor(() =>
    expect(userInfoResult.current.userInfo).toBe(mockUserLvl1)
  );
};

test("LessonsButton redirects to lesson settings on click", async () => {
  await setUpUserInfo();

  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      let availForLessons = url.searchParams.get(AVAIL_LESSONS);
      if (availForLessons == "true") {
        return HttpResponse.json(mockAssignmentsAvailLessonsResponse);
      }
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
      let availForLessons = url.searchParams.get(AVAIL_LESSONS);
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

  await waitFor(() => {
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBe(undefined);
  });

  let errButton = await screen.findByTestId("lesson-btn-err");
  expect(errButton).toHaveTextContent("Error loading data");
});

test("Displays toast on click if no lessons available", async () => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      let availForLessons = url.searchParams.get(AVAIL_LESSONS);
      if (availForLessons == "true") {
        return HttpResponse.json(mockAssignmentsNoAvailLessonsResponse);
      }
      return passthrough();
    })
  );

  const { user } = renderComponent();
  const { result } = renderHook(() => useLessons(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    screen.getByRole("button", {
      name: /lessons/i,
    })
  );

  let errToast = await screen.findByTestId("error-toast");
  expect(errToast).toBeInTheDocument();
});

// TODO: add test
test.todo(
  "Displays error toast if API error and no cached data",
  async () => {}
);

// TODO: add test
test.todo("Displays error toast if 401 error", async () => {
  // http.get(assignmentsEndpoint, ({ request }) => {
  //   const url = new URL(request.url);
  //   let availForLessons = url.searchParams.get(AVAIL_LESSONS);
  //   if (availForLessons == "true") {
  //     return HttpResponse.json(perms401Err, unauthorized401);
  //   }
  //   return passthrough();
  // }),
});

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
