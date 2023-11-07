import { render } from "./testing/test-utils";
import App from "./App";

test("App renders", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
