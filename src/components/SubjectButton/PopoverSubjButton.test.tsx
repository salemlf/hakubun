import { forwardRef } from "react";
import { renderWithRouter } from "../../testing/test-utils";
import { PopoverSubjButton, PopoverSubjButtonProps } from "./PopoverSubjButton";
import { generateSubjAssignmentPair } from "../../testing/mocks/data-generators/subjAssignmentPairGenerator";

const kanjiSubjAndAssignment = generateSubjAssignmentPair({
  subjType: "kanji",
  level: 1,
});

test("PopoverSubjButton renders", () => {
  const MockButton = forwardRef(() => <button></button>);

  const componentProps: PopoverSubjButtonProps = {
    children: <MockButton />,
    subject: kanjiSubjAndAssignment.subject,
    assignment: kanjiSubjAndAssignment.assignment,
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
