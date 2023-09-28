import styled from "styled-components";

const EmojiStyled = styled.span`
  font-size: 1.3rem;
`;

type Props = {
  label: string;
  symbol: string;
};

function Emoji({ label, symbol }: Props) {
  return (
    <EmojiStyled
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </EmojiStyled>
  );
}

export default Emoji;
