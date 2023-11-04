import { rest } from "msw";
import { renderWithClient } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { mockKanjiAssignmentsForLvl1 } from "../../testing/mocks/data/assignments.mock";
import { mockKanjiSubjectsForLvl1 } from "../../testing/mocks/data/subjects.mock";
import {
  kanjiAssignmentsByLvlEndpoint,
  kanjiSubjectsByLvlEndpoint,
} from "../../testing/endpoints";
import LevelProgressBar from ".";

server.use(
  rest.get(kanjiAssignmentsByLvlEndpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockKanjiAssignmentsForLvl1));
  })
);

server.use(
  rest.get(kanjiSubjectsByLvlEndpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockKanjiSubjectsForLvl1));
  })
);

// TODO: add tests to check that the progress bar numbers are rendered correctly
let currentLevel = 1;
test("LevelProgressBar renders without crashing", () => {
  const { baseElement } = renderComponent(currentLevel);
  expect(baseElement).toBeDefined();
});

const renderComponent = (level: number) => {
  return renderWithClient(<LevelProgressBar level={level} />);
};
