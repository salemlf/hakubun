import { renderWithClient } from "../../testing/test-utils";
import { mockKanjiSubjLvl1__440 } from "../../testing/mocks/data/subjects.mock";
import { Subject } from "../../types/Subject";
import SubjectMeanings from "./SubjectMeanings";

test("SubjectMeanings renders", () => {
  const { baseElement } = renderComponent(mockKanjiSubjLvl1__440, true);
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
