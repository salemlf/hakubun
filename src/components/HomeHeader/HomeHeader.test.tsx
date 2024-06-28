import { HttpResponse, http } from "msw";
import {
  renderHook,
  act,
  createQueryWrapper,
  screen,
  waitFor,
  TestRoute,
  createTestRouter,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { generateUserResponse } from "../../testing/mocks/data-generators/userGenerator";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { userEndpoint } from "../../testing/endpoints";
import HomeHeader from ".";

const mockUserResponseLvl5 = generateUserResponse({ level: 5 });

server.use(
  http.get(userEndpoint, () => {
    return HttpResponse.json(mockUserResponseLvl5);
  })
);

test("HomeHeader renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

test("App name is rendered to screen", async () => {
  await renderComponent();

  expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
});

// TODO: change to wait for userInfo to be defined
test("User level is rendered to screen", async () => {
  const { result } = renderHook(() => useUserInfoStoreFacade(), {
    wrapper: createQueryWrapper(),
  });
  await waitFor(() => expect(result.current.userInfo).toBe(undefined));

  const userData = mockUserResponseLvl5.data;

  act(() => result.current.setUserInfo(userData));
  await waitFor(() => expect(result.current.userInfo).toBe(userData));

  await renderComponent();
  const userLvl = mockUserResponseLvl5.data.level;
  const levelTxt = await screen.findByTestId("level-num");
  expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
});

const renderComponent = async () => {
  const homeHeaderPath = "/";

  const routesToRender: TestRoute[] = [
    {
      component: () => <HomeHeader />,
      path: homeHeaderPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: homeHeaderPath,
    });
  });
};
