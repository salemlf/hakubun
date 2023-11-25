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
import { generateAssignmentCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { generateUser } from "../../testing/mocks/data-generators/userGenerator";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { useLessons } from "../../hooks/useLessons";
import LessonSettings from "../../pages/LessonSettings";
import { AssignmentCollection } from "../../types/Collection";
import LessonsButton from ".";

const mockUserLvl1 = generateUser({ level: 1 });
const mockLessonCollection = generateAssignmentCollection(10, true);
const mockEmptyLessonCollection = generateAssignmentCollection(0, true);

const mockAvailLessonsResponse = (mockCollection: AssignmentCollection) => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const availForReview = url.searchParams.get(AVAIL_LESSONS);
      if (availForReview == "true") {
        return HttpResponse.json(mockCollection);
      }
      return passthrough();
    })
  );
};

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

  mockAvailLessonsResponse(mockLessonCollection);

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
      const availForLessons = url.searchParams.get(AVAIL_LESSONS);
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
  });

  await waitFor(() => {
    expect(result.current.data).toBe(undefined);
  });

  const errButton = await screen.findByTestId("lesson-btn-err");
  expect(errButton).toHaveTextContent("Error loading data");
});

test("Displays toast on click if no lessons available", async () => {
  mockAvailLessonsResponse(mockEmptyLessonCollection);

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

  const errToast = await screen.findByTestId("error-toast");
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
  const routes = withLessonSettings
    ? [{ element: <LessonSettings />, path: "/lessons/settings" }]
    : [];
  return renderWithRouter({
    component: <LessonsButton />,
    defaultPath: "/",
    routes,
  });
};
