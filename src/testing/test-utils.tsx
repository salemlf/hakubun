import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, setupIonicReact } from "@ionic/react";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ToastDisplayProvider } from "../components/Toast/ToastDisplayProvider";

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
      <ToastDisplayProvider />
      <ThemeProvider>
        <IonApp>{children}</IonApp>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingApp, ...options });

interface RouteObj {
  routeObj: RouteObject;
  mockHome?: boolean;
  defaultPath?: string;
  routes?: RouteObject[];
}

// cred to Miroslav Nikolov for original version, see article: https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
const renderWithRouter = ({
  routeObj,
  routes = [],
  mockHome = false,
  defaultPath,
}: RouteObj) => {
  const intialEntry = defaultPath ?? "/";

  routes = mockHome
    ? [
        {
          element: (
            <div>
              <p>Home</p>
            </div>
          ),
          path: "/",
        },
        ...routes,
      ]
    : routes;

  // memory router used so we can manually control history
  const router = createMemoryRouter([{ ...routeObj }, ...routes], {
    initialEntries: [intialEntry],
    initialIndex: 0,
  });

  const testQueryClient = createTestQueryClient();

  return {
    router,
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <ToastDisplayProvider />
        <ThemeProvider>
          <IonApp>
            <RouterProvider router={router} />
          </IonApp>
        </ThemeProvider>
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
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export * from "@testing-library/react";
export { customRender as render, renderWithRouter };
