import { rest } from "msw";
// TODO: fix so no need for relative path for test-utils
import { describe, test, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { baseUrl } from "../../api/ApiConfig";
import HomeHeader from ".";

describe("<HomeHeader/>", () => {
  const mockUser = {
    object: "user",
    url: "https://api.wanikani.com/v2/user",
    data_updated_at: "2018-04-06T14:26:53.022245Z",
    data: {
      id: "5a6a5234-a392-4a87-8f3f-33342afe8a42",
      username: "test_user",
      level: 5,
      profile_url: "https://www.wanikani.com/users/example_user",
      started_at: "2012-05-11T00:52:18.958466Z",
      current_vacation_started_at: null,
      subscription: {
        active: true,
        type: "recurring",
        max_level_granted: 60,
        period_ends_at: "2018-12-11T13:32:19.485748Z",
      },
      preferences: {
        default_voice_actor_id: 1,
        extra_study_autoplay_audio: false,
        lessons_autoplay_audio: false,
        lessons_batch_size: 10,
        lessons_presentation_order: "ascending_level_then_subject",
        reviews_autoplay_audio: false,
        reviews_display_srs_indicator: true,
        reviews_presentation_order: "shuffled",
      },
    },
  };

  test("HomeHeader renders without crashing", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeDefined();
  });

  test("App name is rendered to screen", async () => {
    renderComponent();

    expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
  });

  it("User level with mock user", async () => {
    server.use(
      rest.get(`${baseUrl}user`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockUser));
      })
    );
    test("User level is rendered to screen", async () => {
      renderComponent();
      let userLvl = mockUser.data.level;
      let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
      expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
    });
  });
});

const renderComponent = () => {
  return renderWithRouter(<HomeHeader />);
};
