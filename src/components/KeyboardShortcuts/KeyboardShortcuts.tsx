import styled from "styled-components";
import { getSafeArea } from "../../utils";

type ShortcutProps = {
  $bottom: number;
};

const KeyBoardShortcuts = styled.div<ShortcutProps>`
  position: absolute;
  width: 100%;
  padding: ${({ $bottom }) => `${$bottom + 10}px`};
  bottom: 10px;
  display: flex;
  justify-content: space-around;
  z-index: 1;
`;

const Shortcut = styled.p`
  margin: 0;
  color: var(--text-color);
`;

function KeyboardShortcuts() {
  const insetInfo = getSafeArea();

  return (
    <KeyBoardShortcuts $bottom={insetInfo.bottom}>
      <Shortcut>F6: Retry</Shortcut>
      <Shortcut>F12: Next</Shortcut>
    </KeyBoardShortcuts>
  );
}

export default KeyboardShortcuts;
