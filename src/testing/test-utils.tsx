import { isValidElement, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, setupIonicReact } from "@ionic/react";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
import RootContainer from "../components/RootContainer";
import ErrorOccurred from "../pages/ErrorOccurred";

setupIonicReact();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retries off for testing
      retry: false,
    },
  },
});

type TestAppProps = {
  children: React.ReactNode;
};

const TestingApp = ({ children }: TestAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitive.Provider>
        <IonApp>{children}</IonApp>
      </ToastPrimitive.Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestingApp, ...options });

// !added
// ? example usage:
// 1️⃣ Render a page component under "/" by default
// renderWithRouter(<ReviewSession />);

// 2️⃣ Render a page component under a custom path
// renderWithRouter({
//   element: <ReviewSession />,
//   path: "/reviews/session",
// });

// 3️⃣ Render a page component under "/" and set additional routes.
// Useful for testing route navigation
// renderWithRouter(<ReviewSession />, [
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/reviews/settings",
//     element: <ReviewSettings/>,
//   },
// ]);

// TODO: change from using "any" type
// cred to Miroslav Nikolov, see article: https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
const renderWithRouter = (children: any, routes: RouteObject[] = []) => {
  const options = isValidElement(children)
    ? { element: children, path: "/" }
    : children;

  const wrappedRoutes = [
    {
      errorElement: <ErrorOccurred />,
      element: <RootContainer />,
      children: [{ ...options }, ...routes],
    },
  ];

  // memory router used so we can manually control history
  const router = createMemoryRouter(wrappedRoutes, {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <ToastPrimitive.Provider>
          <IonApp>
            <RouterProvider router={router} />
          </IonApp>
        </ToastPrimitive.Provider>
      </QueryClientProvider>
    ),
  };
};

const createTestQueryClient = () =>
  new QueryClient({
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
  });

export const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    user: userEvent.setup(),
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
