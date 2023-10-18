import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, setupIonicReact } from "@ionic/react";

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
import "../src/theme/variables.css";
import "../src/theme/globals.scss";

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

export * from "@testing-library/react";
export { customRender as render };
