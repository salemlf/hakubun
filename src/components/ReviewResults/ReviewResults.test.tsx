import { renderWithClient } from "../../testing/test-utils";
import ReviewResults, { ReviewResultsProps } from "./ReviewResults";

// TODO: use mock completed assignment queue items
test("ReviewResults renders", () => {
  const resultProps: ReviewResultsProps = {
    groupedReviewItems: {
      correct: [],
      incorrect: [],
    },
  };
  const { baseElement } = renderComponent(resultProps);
  expect(baseElement).toBeDefined();
});

const renderComponent = (props: ReviewResultsProps) => {
  return renderWithClient(<ReviewResults {...props} />);
};
