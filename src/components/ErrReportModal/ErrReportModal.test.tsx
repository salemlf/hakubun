import { renderWithRouter } from "../../testing/test-utils";
import ErrReportModal, { Props } from "./ErrReportModal";

test("ErrReportModal renders", () => {
  const { baseElement } = renderComponent({
    isOpen: true,
    setIsOpen: (isOpen: boolean) => {},
    errMsg: "Fake Error Message",
    stackTrace: "Fake Stack Trace\nBeep boop\nBop",
  });
  expect(baseElement).toBeDefined();
});

test.todo("Click on submit button", () => {});

const renderComponent = ({ ...props }: Props) => {
  return renderWithRouter({
    routeObj: {
      element: <ErrReportModal {...props} />,
      path: "/",
    },
    routes: [],
  });
};
