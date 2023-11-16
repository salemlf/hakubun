import { HttpResponse, http } from "msw";
import {
  renderWithRouter,
  screen,
  renderHook,
  act,
} from "../testing/test-utils";
import { server } from "../testing/mocks/server";
import { userEndpoint } from "../testing/endpoints";
import {
  mockUserLvl1,
  mockUserResponseLvl1,
} from "../testing/mocks/data/user.mock";
import useAuthTokenStoreFacade from "../stores/useAuthTokenStore/useAuthTokenStore.facade";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import * as useUserLogin from "../hooks/useUserLogin";
import Home from "./Home";
import TokenInput from "./TokenInput";

test("TokenInput renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("Redirects to home page after entering token (logging in)", async () => {
  server.use(
    http.get(userEndpoint, () => {
      return HttpResponse.json(mockUserResponseLvl1);
    })
  );
  const { user } = renderComponent(true);
  const fakeTokenValue = "my_fake_token";

  let tokenInput = screen.getByRole("textbox", {
    name: /wanikani api token \?/i,
  });
  await user.type(tokenInput, fakeTokenValue);
  expect(tokenInput).toHaveValue(fakeTokenValue);

  await user.click(
    screen.getByRole("button", {
      name: /submit token/i,
    })
  );

  const mockLogin = () => Promise.resolve(true);
  vi.spyOn(useUserLogin, "useUserLogin").mockImplementation(() => ({
    login: mockLogin,
    logout: vi.fn(),
  }));

  await expect(mockLogin()).resolves.not.toThrow();
  expect(await screen.findByTestId("home-heading")).toBeInTheDocument();
});

test("Redirect to home page from token input page if user already authenticated", async () => {
  // setting user info
  const { result: userInfoResult } = renderHook(() => useUserInfoStoreFacade());
  expect(userInfoResult.current.userInfo).toEqual(undefined);
  act(() => userInfoResult.current.setUserInfo(mockUserLvl1));

  // setting auth token info
  const fakeTokenValue = "my_fake_token";
  const { result: authTokenResult } = renderHook(() =>
    useAuthTokenStoreFacade()
  );
  expect(authTokenResult.current.authToken).toEqual(null);
  act(() => authTokenResult.current.setAuthToken(fakeTokenValue));

  expect(authTokenResult.current.isAuthenticated).toEqual(false);
  act(() => authTokenResult.current.setIsAuthenticated(true));

  renderComponent(true);

  expect(await screen.findByTestId("home-heading")).toBeInTheDocument();
});

const renderComponent = (withHomeRoute: boolean = false) => {
  return renderWithRouter({
    routeObj: {
      path: "/authenticate",
      element: <TokenInput />,
    },
    routes: withHomeRoute
      ? [
          {
            path: "/",
            element: <Home />,
          },
        ]
      : [],
  });
};
