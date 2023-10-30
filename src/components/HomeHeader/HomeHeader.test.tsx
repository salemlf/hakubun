import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import { baseUrl } from "../../api/ApiConfig";
import {
  renderHook,
  act,
  renderWithRouter,
  createWrapper,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { mockUserLvl5 } from "../../testing/mocks/data/user.mock";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import HomeHeader from ".";

server.use(
  rest.get(`${baseUrl}user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserLvl5));
  })
);

describe("<HomeHeader/>", () => {
  test("HomeHeader renders", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeDefined();
  });

  test("App name is rendered to screen", async () => {
    renderComponent();

    expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
  });

  // TODO: change to wait for userInfo to be defined
  test("User level is rendered to screen", async () => {
    const { result } = renderHook(() => useUserInfoStoreFacade(), {
      wrapper: createWrapper(),
    });

    let userData = mockUserLvl5.data;

    act(() => result.current.setUserInfo(userData));

    renderComponent();
    let userLvl = mockUserLvl5.data.level;
    let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
    expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
  });
});

const renderComponent = () => {
  return renderWithRouter(<HomeHeader />);
};
