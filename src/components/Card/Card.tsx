import { ReactNode } from "react";
import styled from "styled-components";

type CardContainerProps = {
  cardbgcolor: string;
};
const CardContainer = styled.div<CardContainerProps>`
  margin: 10px 15px 5px 15px;
  background-color: ${({ cardbgcolor }) => cardbgcolor};
  border-radius: 8px;
  color: white;
`;

type HeaderContainerProps = {
  headerbgcolor: string;
};

const Header = styled.header<HeaderContainerProps>`
  border-radius: 8px 8px 0 0;
  background-color: ${({ headerbgcolor }) => headerbgcolor};
  padding: 10px;
  font-size: 1.5rem;
`;

const CardContent = styled.div`
  padding: 10px;
  font-size: 1rem;
`;

type Props = {
  children?: ReactNode;
  title?: string;
  cardBgColor?: string;
  headerBgColor?: string;
};

function Card({
  children,
  title,
  cardBgColor = "var(--light-greyish-purple)",
  headerBgColor = "var(--light-greyish-purple)",
}: Props) {
  return (
    <CardContainer cardbgcolor={cardBgColor}>
      {title && <Header headerbgcolor={headerBgColor}>{title}</Header>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
