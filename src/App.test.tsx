import { render } from "./testing/test-utils";
import App from "./App";

describe("<App />", () => {
  test("App renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
