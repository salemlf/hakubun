import { ReactNode } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 10px;
  background-color: var(--light-greyish-purple);
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
  headerBgColor?: string;
};

function Card({
  children,
  title,
  headerBgColor = "var(--light-greyish-purple)",
}: Props) {
  return (
    <CardContainer>
      {title && <Header headerbgcolor={headerBgColor}>{title}</Header>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
