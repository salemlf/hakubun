import * as LabelPrimitive from "@radix-ui/react-label";
import { PrimitiveLabelProps } from "@radix-ui/react-label";
import styled from "styled-components";

type LabelStyledProps = {
  labelfontsize: string;
  color: string;
};

const LabelStyled = styled(LabelPrimitive.Root)<LabelStyledProps>`
  font-size: ${({ labelfontsize }) => `${labelfontsize}`};
  color: ${({ color }) => `${color}`};
`;

type LabelProps = PrimitiveLabelProps & {
  idOfControl: string;
  labelText: string;
  labelfontSize?: string;
  color?: string;
};

function Label({
  idOfControl,
  labelText,
  labelfontSize = "1.2rem",
  color = "white",
}: LabelProps) {
  return (
    <LabelStyled
      htmlFor={idOfControl}
      labelfontsize={labelfontSize}
      color={color}
    >
      {labelText}
    </LabelStyled>
  );
}

export default Label;
