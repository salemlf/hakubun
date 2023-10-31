import styled from "styled-components";

const ReviewSummaryHeader = styled.header`
  background-color: var(--wanikani-review);
  padding: 5px 0 10px;
  color: white;
  text-align: center;
`;

const ReviewSummaryHeadingTxt = styled.h1`
  font-size: 1.5rem;
  margin: 15px 0;
`;

const Percentage = styled.h2`
  font-size: 1.75rem;
  margin-top: 10px;
`;

const AnsweredCorrectly = styled.p`
  margin: 10px;
`;

type Props = {
  numCorrect: number;
  numReviews: number;
};

// TODO: change to use custom header component
function ResultsHeader({ numCorrect, numReviews }: Props) {
  let percentageCorrect = Math.ceil(100 * (numCorrect / numReviews));

  return (
    <ReviewSummaryHeader>
      <ReviewSummaryHeadingTxt>Review Summary</ReviewSummaryHeadingTxt>
      <Percentage>{percentageCorrect}%</Percentage>
      <AnsweredCorrectly>Answered Correctly</AnsweredCorrectly>
    </ReviewSummaryHeader>
  );
}

export default ResultsHeader;
