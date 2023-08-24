import { ReactNode } from "react";
import { Header } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

type CardContainerProps = {
  cardbgcolor: string;
  margin: string;
};
const CardContainer = styled.div<CardContainerProps>`
  margin: ${({ margin }) => margin};
  background-color: ${({ cardbgcolor }) => cardbgcolor};
  border-radius: 8px;
  color: white;
`;

const CardHeader = styled(Header)`
  border-radius: 8px 8px 0 0;
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
  margin?: string;
};

function Card({
  children,
  title,
  cardBgColor = "var(--light-greyish-purple)",
  headerBgColor = "var(--light-greyish-purple)",
  margin = "16px",
}: Props) {
  return (
    <CardContainer cardbgcolor={cardBgColor} margin={margin}>
      {title && <CardHeader bgcolor={headerBgColor}>{title}</CardHeader>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
