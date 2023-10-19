import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

// TODO: this shows an error "TypeError: Cannot set properties of null (setting 'textBaseline')"...
// TODO: ... maybe has to do with react-secure-storage?
describe("<App />", () => {
  test("App renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
