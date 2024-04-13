import { render } from "../../testing/test-utils";
import Modal from ".";

test("Modal renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return render(
    <Modal>
      <Modal.Trigger asChild>
        <button>Test button</button>
      </Modal.Trigger>
      <Modal.Content modalID="test-modal" title="Test" isOpen={false}>
        <p>Content</p>
      </Modal.Content>
    </Modal>
  );
};
