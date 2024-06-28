import { act, createTestRouter, TestRoute } from "../../testing/test-utils";
import ErrReportModal, { Props } from "./ErrReportModal";

test("ErrReportModal renders", async () => {
  const { baseElement } = await renderComponent({
    isOpen: true,
    setIsOpen: (isOpen: boolean) => {},
    errMsg: "Fake Error Message",
    stackTrace: "Fake Stack Trace\nBeep boop\nBop",
  });
  expect(baseElement).toBeDefined();
});

test.todo("Click on submit button", () => {});

const renderComponent = async ({ ...props }: Props) => {
  const errReportModalPath = "/settings";
  const routesToRender: TestRoute[] = [
    {
      component: () => <ErrReportModal {...props} />,
      path: errReportModalPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: errReportModalPath,
    });
  });
};
