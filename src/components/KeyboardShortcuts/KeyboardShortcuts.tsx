import styled from "styled-components";

const KeyBoardShortcuts = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Shortcut = styled.p`
  margin: 0;
  color: var(--text-color);
`;

function KeyboardShortcuts() {
  return (
    <KeyBoardShortcuts>
      <Shortcut>F6: Retry</Shortcut>
      <Shortcut>F12: Next</Shortcut>
    </KeyBoardShortcuts>
  );
}

export default KeyboardShortcuts;
