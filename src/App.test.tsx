import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("App renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
