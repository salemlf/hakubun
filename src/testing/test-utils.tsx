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
import { Either } from "../types/Global";

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
import { ToastDisplayProvider } from "../components/Toast/displayToast";

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
      <IonApp>{children}</IonApp>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingApp, ...options });

interface RouteOrComponentBase {
  routes?: RouteObject[];
}
interface RouteObj extends RouteOrComponentBase {
  routeObj: RouteObject;
}
interface Component extends RouteOrComponentBase {
  component: JSX.Element;
  defaultPath?: string;
}

type RouteOrComponent = Either<RouteObj, Component>;

// cred to Miroslav Nikolov for original version, see article: https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
const renderWithRouter = ({
  routeObj,
  component,
  defaultPath,
  routes = [],
}: RouteOrComponent) => {
  const routeInfo = routeObj ?? { element: component, path: defaultPath };

  const path = routeObj?.path ?? defaultPath ?? "/";

  // memory router used so we can manually control history
  const router = createMemoryRouter([{ ...routeInfo }, ...routes], {
    initialEntries: [path],
    initialIndex: 0,
  });

  const testQueryClient = createTestQueryClient();

  return {
    router,
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <ToastDisplayProvider />
        <IonApp>
          <RouterProvider router={router} />
        </IonApp>
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
