import { ReactElement, act } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, setupIonicReact } from "@ionic/react";

import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouteComponent,
  RouterProvider,
} from "@tanstack/react-router";
import userEvent from "@testing-library/user-event";
import { useUserSettingsStore } from "../stores/useUserSettingsStore/useUserSettingsStore";
import { useAuthTokenStore } from "../stores/useAuthTokenStore/useAuthTokenStore";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AssignmentSettingsProvider } from "../contexts/AssignmentSettingsContext";
import { BottomSheetOpenProvider } from "../contexts/BottomSheetOpenContext";
import { TabBarHeightProvider } from "../contexts/TabBarHeightContext";
import { AuthProvider } from "../contexts/AuthContext";
import { PersistentStore } from "../hooks/useHydration";
import { getSortOrderOptionById } from "../components/SortOrderOption/SortOrderOption.service";
import { AssignmentSessionType } from "../types/AssignmentQueueTypes";
import { BackToBackChoice } from "../components/BackToBackOption/BackToBackOption.types";
import { ToastDisplayProvider } from "../components/Toast/ToastDisplayProvider";
import HydrationWrapper from "../components/HydrationWrapper";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";
import "../theme/globals.scss";

setupIonicReact();

const queryClientTestOptions = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
};

const createTestQueryClient = () => new QueryClient(queryClientTestOptions);

type TestAppProps = {
  children: React.ReactNode;
};

const TestingApp = ({ children }: TestAppProps) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      <HydrationWrapper store={useUserSettingsStore as PersistentStore}>
        <HydrationWrapper store={useAuthTokenStore as PersistentStore}>
          <AuthProvider>
            <ToastDisplayProvider />
            <ThemeProvider>
              <BottomSheetOpenProvider>
                <TabBarHeightProvider>
                  <IonApp>{children}</IonApp>
                </TabBarHeightProvider>
              </BottomSheetOpenProvider>
            </ThemeProvider>
          </AuthProvider>
        </HydrationWrapper>
      </HydrationWrapper>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingApp, ...options });

export type TestRoute = {
  path: string;
  component: RouteComponent;
};

type CreateRoutesProps = {
  routes: TestRoute[];
  initialEntry?: string;
};

export const createTestRouter = async ({
  routes,
  initialEntry = "/",
}: CreateRoutesProps) => {
  const rootRoute = createRootRoute();
  const generatedRoutes = routes.map((route) => {
    return createRoute({
      getParentRoute: () => rootRoute,
      path: route.path,
      component: route.component,
    });
  });

  const memoryHistory = createMemoryHistory({
    initialEntries: [initialEntry],
    initialIndex: 0,
  });
  const routeTree = rootRoute.addChildren([...generatedRoutes]);

  const router = await act(() =>
    createRouter({
      routeTree,
      history: memoryHistory,
      context: { auth: vi.fn() },
    })
  );

  const testQueryClient = createTestQueryClient();

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <HydrationWrapper store={useUserSettingsStore as PersistentStore}>
          <HydrationWrapper store={useAuthTokenStore as PersistentStore}>
            <AuthProvider>
              <ToastDisplayProvider />
              <ThemeProvider>
                <BottomSheetOpenProvider>
                  <TabBarHeightProvider>
                    <IonApp>
                      {/* TODO: change so not using "any" type */}
                      <RouterProvider
                        router={router as any}
                        context={{ auth: vi.fn() }}
                      />
                    </IonApp>
                  </TabBarHeightProvider>
                </BottomSheetOpenProvider>
              </ThemeProvider>
            </AuthProvider>
          </HydrationWrapper>
        </HydrationWrapper>
      </QueryClientProvider>
    ),
  };
};

export const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );

  return {
    ...result,
    user: userEvent.setup(),
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
};

export const createQueryWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

// TODO: allow passing in mockedProviderProps
export const createAssignmentSettingsWrapper = (
  settingsType: AssignmentSessionType
) => {
  const mockedProviderProps = {
    batchSize: "2",
    backToBackChoice: "disabled" as BackToBackChoice,
    sortOption: getSortOrderOptionById("level_asc"),
    settingsType: settingsType,
  };

  return ({ children }: { children: React.ReactNode }) => (
    <AssignmentSettingsProvider {...mockedProviderProps}>
      {children}
    </AssignmentSettingsProvider>
  );
};

export * from "@testing-library/react";
export { customRender as render };
export { act };
