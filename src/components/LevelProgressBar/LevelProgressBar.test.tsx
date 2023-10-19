import { describe, test, expect } from "vitest";
// TODO: fix so no need for relative path for test-utils
import { render } from "../../testing/test-utils";
import { screen } from "@testing-library/react";
import LevelProgressBar from ".";

describe("<LevelProgressBar/>", () => {
  let currentLevel = 5;
  test("LevelProgressBar renders without crashing", () => {
    const { baseElement } = renderComponent(currentLevel);
    expect(baseElement).toBeDefined();
  });

  test("Level is rendered to screen", async () => {
    renderComponent(currentLevel);

    expect(await screen.findByText(/^5$/)).toBeInTheDocument();

    // !added
    screen.logTestingPlaygroundURL();
    // !added
  });
});

const renderComponent = (level: number) => {
  return render(<LevelProgressBar level={level} />);
};
