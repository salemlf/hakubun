import { renderWithClient } from "../../testing/test-utils";
import { generateSubject } from "../../testing/mocks/data-generators/subjectGenerator";
import { Subject } from "../../types/Subject";
import AddAltUserMeaningButton from "./AddAltUserMeaningButton";

const mockKanjiLvl1Subj = generateSubject({ subjType: "kanji", level: 1 });

test("AddAltUserMeaningButton renders", () => {
  const { baseElement } = renderComponent(mockKanjiLvl1Subj);
  expect(baseElement).toBeDefined();
});

const renderComponent = (subject: Subject) => {
  return renderWithClient(<AddAltUserMeaningButton subject={subject} />);
};
