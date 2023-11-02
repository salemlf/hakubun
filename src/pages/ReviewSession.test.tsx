import { renderWithRouter } from "../testing/test-utils";
import ReviewSession from "./ReviewSession";

test("ReviewSession renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter(<ReviewSession />);
};
