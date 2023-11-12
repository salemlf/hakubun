import { forwardRef } from "react";
import { renderWithRouter } from "../../testing/test-utils";
import { mockKanjiAssignmentLvl1_440 } from "../../testing/mocks/data/assignments.mock";
import { mockKanjiSubjLvl1__440 } from "../../testing/mocks/data/subjects.mock";
import { PopoverSubjButton, PopoverSubjButtonProps } from "./PopoverSubjButton";

test("PopoverSubjButton renders", () => {
  const MockButton = forwardRef(() => <button></button>);

  const componentProps: PopoverSubjButtonProps = {
    children: <MockButton />,
    subject: mockKanjiSubjLvl1__440,
    assignment: mockKanjiAssignmentLvl1_440,
  };

  const { baseElement } = renderComponent(componentProps);
  expect(baseElement).toBeDefined();
});

const renderComponent = (props: PopoverSubjButtonProps) => {
  return renderWithRouter({
    component: <PopoverSubjButton {...props} />,
    defaultPath: "/",
  });
};
