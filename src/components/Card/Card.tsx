import { ReactNode } from "react";
import {
  CustomBgColor,
  CustomFontSize,
} from "../../styles/BaseStyledComponents";
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

  &:not(:first-child) {
    margin-top: 0;
  }
`;

const CardHeader = styled.header<CustomBgColor & CustomFontSize>`
  background-color: ${({ bgcolor }) => bgcolor};
  font-size: ${({ sizeoffont }) => sizeoffont};
  padding: 10px;
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
  headerFontSize?: string;
};

function Card({
  children,
  title,
  cardBgColor = "var(--light-greyish-purple)",
  headerBgColor = "var(--light-greyish-purple)",
  margin = "16px",
  headerFontSize = "1.5rem",
}: Props) {
  return (
    <CardContainer cardbgcolor={cardBgColor} margin={margin}>
      {title && (
        <CardHeader bgcolor={headerBgColor} sizeoffont={headerFontSize}>
          {title}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
