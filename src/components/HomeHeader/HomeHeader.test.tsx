import { rest } from "msw";
// TODO: fix so no need for relative path for test-utils
import { describe, test, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { baseUrl } from "../../api/ApiConfig";
import { renderWithRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { mockUserLvl5 } from "../../testing/mocks/data/user.mock";
import HomeHeader from ".";

server.use(
  rest.get(`${baseUrl}user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserLvl5));
  })
);

describe("<HomeHeader/>", () => {
  test("HomeHeader renders", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeDefined();
  });

  test("App name is rendered to screen", async () => {
    renderComponent();

    expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
  });

  // TODO: change to wait for userInfo to be defined
  test("User level is rendered to screen", async () => {
    renderComponent();
    let userLvl = mockUserLvl5.data.level;
    let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
    console.log(
      "🚀 ~ file: HomeHeader.test.tsx:33 ~ test ~ levelTxt:",
      levelTxt
    );
    expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
  });
});

const renderComponent = () => {
  return renderWithRouter(<HomeHeader />);
};
