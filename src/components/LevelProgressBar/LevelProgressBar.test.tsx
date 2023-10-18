// import { fireEvent, render, screen } from "@testing-library/react";
// TODO: fix so no need for relative path for test-utils
import { describe, test, expect } from "vitest";
import { render } from "../../../testing/test-utils";
import "@testing-library/jest-dom";
import LevelProgressBar from ".";

// test("displays", async () => {
//   render(<LevelProgressBar level={5} />);

//   // ACT
//   // await userEvent.click(screen.getByText("Load Greeting"));
//   // await screen.findByRole("heading");

//   // ASSERT
//   // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   // expect(screen.getByRole('button')).toBeDisabled()
// });

describe("<LevelProgressBar />", () => {
  test("LevelProgressBar renders without crashing", () => {
    const { baseElement } = render(<LevelProgressBar level={5} />);
    expect(baseElement).toBeDefined();
  });
});
