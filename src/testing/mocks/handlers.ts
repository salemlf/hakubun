import { baseUrl } from "../../api/ApiConfig";
import { rest } from "msw";

const kanjiAssignmentsEndpoint = new RegExp(
  `${baseUrl}assignments\?levels=[0-9][0-9]?&subject_types=kanji`,
  "gi"
);
// TODO: create and use mock zustand
export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get(`${baseUrl}user`, (req, res, ctx) => {
    // *testing
    console.log("/user mock called!");
    // *testing

    const mockUser = {
      object: "user",
      url: "https://api.wanikani.com/v2/user",
      data_updated_at: "2018-04-06T14:26:53.022245Z",
      data: {
        id: "5a6a5234-a392-4a87-8f3f-33342afe8a42",
        username: "test_user",
        level: 15,
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

    return res(ctx.status(200), ctx.json(mockUser));
  }),

  // rest.post(`${baseUrl}assignments?levels=${level}&subject_types=kanji`, (req, res, ctx) => {
  rest.get(kanjiAssignmentsEndpoint, (req, res, ctx) => {
    const kanjiAssignments = {
      object: "collection",
      url: "https://api.wanikani.com/v2/assignments",
      pages: {
        per_page: 500,
        next_url:
          "https://api.wanikani.com/v2/assignments?page_after_id=80469434",
        previous_url: null,
      },
      total_count: 1600,
      data_updated_at: "2017-11-29T19:37:03.571377Z",
      data: [
        {
          id: 80463006,
          object: "assignment",
          url: "https://api.wanikani.com/v2/assignments/80463006",
          data_updated_at: "2017-10-30T01:51:10.438432Z",
          data: {
            created_at: "2017-09-05T23:38:10.695133Z",
            subject_id: 8761,
            subject_type: "radical",
            srs_stage: 8,
            unlocked_at: "2017-09-05T23:38:10.695133Z",
            started_at: "2017-09-05T23:41:28.980679Z",
            passed_at: "2017-09-07T17:14:14.491889Z",
            burned_at: null,
            available_at: "2018-02-27T00:00:00.000000Z",
            resurrected_at: null,
          },
        },
      ],
    };

    return res(ctx.status(200), ctx.json(kanjiAssignments));
  }),
];
