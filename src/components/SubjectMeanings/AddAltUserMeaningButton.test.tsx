import { renderWithClient } from "../../testing/test-utils";
import { mockKanjiLvl1 } from "../../testing/mocks/data/subjects.mock";
import { Subject } from "../../types/Subject";
import AddAltUserMeaningButton from "./AddAltUserMeaningButton";

test("AddAltUserMeaningButton renders", () => {
  const { baseElement } = renderComponent(mockKanjiLvl1);
  expect(baseElement).toBeDefined();
});

const renderComponent = (subject: Subject) => {
  return renderWithClient(<AddAltUserMeaningButton subject={subject} />);
};
