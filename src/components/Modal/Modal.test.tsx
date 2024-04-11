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
      <Modal.Content title="Test" isOpen={false} modalID="test-modal">
        <p>Content</p>
      </Modal.Content>
    </Modal>
  );
};
