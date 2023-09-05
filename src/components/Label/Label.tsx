import * as LabelPrimitive from "@radix-ui/react-label";
import { PrimitiveLabelProps } from "@radix-ui/react-label";
import styled from "styled-components";

type LabelStyledProps = {
  fontsize: string;
  color: string;
};

const LabelStyled = styled(LabelPrimitive.Root)<LabelStyledProps>`
  font-size: ${({ fontsize }) => `${fontsize}`};
  color: ${({ color }) => `${color}`};
`;

type LabelProps = PrimitiveLabelProps & {
  idOfControl: string;
  labelText: string;
  fontSize?: string;
  color?: string;
};

function Label({
  idOfControl,
  labelText,
  fontSize = "1.25rem",
  color = "white",
}: LabelProps) {
  return (
    <LabelStyled htmlFor={idOfControl} fontsize={fontSize} color={color}>
      {labelText}
    </LabelStyled>
  );
}

export default Label;
