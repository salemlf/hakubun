import { HttpResponse, http } from "msw";
import {
  screen,
  renderHook,
  act,
  TestRoute,
  createTestRouter,
} from "../testing/test-utils";
import { server } from "../testing/mocks/server";
import { userEndpoint } from "../testing/endpoints";
import {
  generateUser,
  generateUserResponse,
} from "../testing/mocks/data-generators/userGenerator";
import useAuthTokenStoreFacade from "../stores/useAuthTokenStore/useAuthTokenStore.facade";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import TokenInput from "./TokenInput";

const mockUserLvl1 = generateUser({ level: 1 });
const mockLvl1UserResponse = generateUserResponse({ level: 1 });

test("TokenInput renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

test("Redirects to home page after entering token (logging in)", async () => {
  server.use(
    http.get(userEndpoint, () => {
      return HttpResponse.json(mockLvl1UserResponse);
    })
  );

  const { user } = await renderComponent(true);
  const fakeTokenValue = "my_fake_token";

  const tokenInput = await screen.findByTestId("token-input");
  await user.type(tokenInput, fakeTokenValue);
  expect(tokenInput).toHaveValue(fakeTokenValue);

  await user.click(
    screen.getByRole("button", {
      name: /submit token/i,
    })
  );

  const mockLogin = () => Promise.resolve(true);

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

  await renderComponent(true);

  expect(await screen.findByTestId("home-heading")).toBeInTheDocument();
});

const renderComponent = async (withHomeRoute: boolean = false) => {
  const tokenInputPath = "/authenticate";
  const tokenInputRoute: TestRoute = {
    component: () => <TokenInput />,
    path: tokenInputPath,
  };

  const homeRoute: TestRoute = {
    path: "/",
    component: () => (
      <div>
        <h1 data-testid="home-heading">Mock Home</h1>
      </div>
    ),
  };

  const routesToRender: TestRoute[] = [
    tokenInputRoute,
    ...(withHomeRoute ? [homeRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: tokenInputPath,
    });
  });
};
