import { render } from "../../testing/test-utils";
import { screen } from "@testing-library/react";
import LevelProgressBar from ".";

describe("<LevelProgressBar/>", () => {
  let currentLevel = 5;
  test("LevelProgressBar renders without crashing", () => {
    const { baseElement } = renderComponent(currentLevel);
    expect(baseElement).toBeDefined();
  });
});

const renderComponent = (level: number) => {
  return render(<LevelProgressBar level={level} />);
};
