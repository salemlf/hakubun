import { ReactNode } from "react";
import {
  CustomBgColor,
  CustomFontSize,
  CustomTextColor,
} from "../../styles/BaseStyledComponents";
import styled from "styled-components";

type CardContainerProps = {
  cardbgcolor: string;
  margin: string;
};

const CardContainer = styled.div<CardContainerProps & CustomTextColor>`
  margin: ${({ margin }) => margin};
  background-color: ${({ cardbgcolor }) => cardbgcolor};
  border-radius: 8px;
  color: ${({ txtcolor }) => txtcolor};

  &:not(:first-child) {
    margin-top: 0;
  }
`;

const CardHeader = styled.header<
  CustomBgColor & CustomFontSize & CustomTextColor
>`
  background-color: ${({ bgcolor }) => bgcolor};
  font-size: ${({ sizeoffont }) => sizeoffont};
  color: ${({ txtcolor }) => txtcolor};
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
  cardTextColor?: string;
  headerBgColor?: string;
  headerTextColor?: string;
  headerFontSize?: string;
  margin?: string;
};

function Card({
  children,
  title,
  headerTextColor = "var(--text-color)",
  headerBgColor = "var(--foreground-color)",
  headerFontSize = "1.5rem",
  cardBgColor = "var(--foreground-color)",
  cardTextColor = "var(--text-color)",
  margin = "16px",
}: Props) {
  return (
    <CardContainer
      cardbgcolor={cardBgColor}
      margin={margin}
      txtcolor={cardTextColor}
    >
      {title && (
        <CardHeader
          bgcolor={headerBgColor}
          sizeoffont={headerFontSize}
          txtcolor={headerTextColor}
        >
          {title}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
