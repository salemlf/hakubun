import * as LabelPrimitive from "@radix-ui/react-label";
import { PrimitiveLabelProps } from "@radix-ui/react-label";
import type { RequireExactlyOne } from "type-fest";
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

type LabelContents = {
  idOfControl: string;
  labelfontSize?: string;
  isBold?: boolean;
  color?: string;
  children: React.ReactNode;
  labelText: string;
};

type LabelProps = PrimitiveLabelProps &
  RequireExactlyOne<LabelContents, "children" | "labelText">;

function Label({
  idOfControl,
  labelfontSize = "1.2rem",
  color = "var(--text-color)",
  isBold = false,
  labelText,
  children,
}: LabelProps) {
  return (
    <LabelStyled
      htmlFor={idOfControl}
      labelfontsize={labelfontSize}
      color={color}
      $isBold={isBold}
    >
      {children || labelText}
    </LabelStyled>
  );
}

export default Label;
