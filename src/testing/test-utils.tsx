import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, setupIonicReact } from "@ionic/react";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";

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

//   TODO: add set up for stores
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

const TestingAppWithBrowserRouter = ({ children }: TestAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitive.Provider>
        <IonApp>
          <BrowserRouter>{children}</BrowserRouter>
        </IonApp>
      </ToastPrimitive.Provider>
    </QueryClientProvider>
  );
};

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: TestingAppWithBrowserRouter }),
  };
};

export const handlers = [
  rest.get("*/react-query", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "mocked-react-query",
      })
    );
  }),
];

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
