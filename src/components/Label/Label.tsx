import * as LabelPrimitive from "@radix-ui/react-label";
import { PrimitiveLabelProps } from "@radix-ui/react-label";
import styled from "styled-components";

type LabelStyledProps = {
  labelfontsize: string;
  color: string;
  $isBold: boolean;
};

const LabelStyled = styled(LabelPrimitive.Root)<LabelStyledProps>`
  font-size: ${({ labelfontsize }) => `${labelfontsize}`};
  color: ${({ color }) => `${color}`};
  font-weight: ${({ $isBold }) => $isBold && 600};
`;

type LabelProps = PrimitiveLabelProps & {
  idOfControl: string;
  labelText: string;
  labelfontSize?: string;
  isBold?: boolean;
  color?: string;
};

function Label({
  idOfControl,
  labelText,
  labelfontSize = "1.2rem",
  color = "var(--text-color)",
  isBold = false,
}: LabelProps) {
  return (
    <LabelStyled
      htmlFor={idOfControl}
      labelfontsize={labelfontSize}
      color={color}
      $isBold={isBold}
    >
      {labelText}
    </LabelStyled>
  );
}

export default Label;
