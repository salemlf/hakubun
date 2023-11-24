import { renderWithClient } from "../../testing/test-utils";
import { generateSubject } from "../../testing/mocks/data-generators/subjectGenerator";
import { Subject } from "../../types/Subject";
import SubjectMeanings from "./SubjectMeanings";

const mockKanjiLvl1Subj = generateSubject({ subjType: "kanji", level: 1 });

test("SubjectMeanings renders", () => {
  const { baseElement } = renderComponent(mockKanjiLvl1Subj, true);
  expect(baseElement).toBeDefined();
});

const renderComponent = (subject: Subject, showPrimaryMeanings: boolean) => {
  return renderWithClient(
    <SubjectMeanings
      subject={subject}
      showPrimaryMeaning={showPrimaryMeanings}
    />
  );
};
