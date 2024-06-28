import { forwardRef } from "react";
import { act, createTestRouter, TestRoute } from "../../testing/test-utils";
import { PopoverSubjButton, PopoverSubjButtonProps } from "./PopoverSubjButton";
import { generateSubjAssignmentPair } from "../../testing/mocks/data-generators/subjAssignmentPairGenerator";

const kanjiSubjAndAssignment = generateSubjAssignmentPair({
  subjType: "kanji",
  level: 1,
});

test("PopoverSubjButton renders", async () => {
  const MockButton = forwardRef(() => <button title="Test Button"></button>);

  const componentProps: PopoverSubjButtonProps = {
    children: <MockButton />,
    subject: kanjiSubjAndAssignment.subject,
    assignment: kanjiSubjAndAssignment.assignment,
  };

  const { baseElement } = await renderComponent(componentProps);
  expect(baseElement).toBeDefined();
});

const renderComponent = async (props: PopoverSubjButtonProps) => {
  const popoverSubjPath = "/";
  const routesToRender: TestRoute[] = [
    {
      component: () => <PopoverSubjButton {...props} />,
      path: popoverSubjPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: popoverSubjPath,
    });
  });
};
