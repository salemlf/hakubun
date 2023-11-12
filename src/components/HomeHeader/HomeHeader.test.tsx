import { rest } from "msw";
import {
  renderHook,
  act,
  renderWithRouter,
  createWrapper,
  screen,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { mockUserResponseLvl5 } from "../../testing/mocks/data/user.mock";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { userEndpoint } from "../../testing/endpoints";
import HomeHeader from ".";

server.use(
  rest.get(userEndpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserResponseLvl5));
  })
);

test("HomeHeader renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("App name is rendered to screen", async () => {
  renderComponent();
  screen.debug();

  expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
});

// TODO: change to wait for userInfo to be defined
test("User level is rendered to screen", async () => {
  const { result } = renderHook(() => useUserInfoStoreFacade(), {
    wrapper: createWrapper(),
  });

  let userData = mockUserResponseLvl5.data;

  act(() => result.current.setUserInfo(userData));

  renderComponent();
  let userLvl = mockUserResponseLvl5.data.level;
  let levelTxt = await screen.findByTestId("level-num");
  expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
});

const renderComponent = () => {
  return renderWithRouter({ component: <HomeHeader />, defaultPath: "/" });
};
