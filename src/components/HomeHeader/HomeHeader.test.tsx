// TODO: fix so no need for relative path for test-utils
import { describe, test, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "../../testing/test-utils";
import HomeHeader from ".";

describe("<HomeHeader/>", () => {
  test("HomeHeader renders without crashing", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeDefined();
  });

  test("App name is rendered to screen", async () => {
    renderComponent();

    expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
  });

  test("Level is rendered to screen", async () => {
    renderComponent();

    let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
    expect(levelTxt).toHaveTextContent(/^Level$/);
  });
});

const renderComponent = () => {
  return renderWithRouter(<HomeHeader />);
};
