import styled from "styled-components";

const KeyBoardShortcuts = styled.div`
  position: absolute;
  width: 100%;
  bottom: 10px;
  display: flex;
  justify-content: space-around;
`;

const Shortcut = styled.p`
  margin: 0;
  color: white;
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
