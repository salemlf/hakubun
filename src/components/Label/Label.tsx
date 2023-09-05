import * as LabelPrimitive from "@radix-ui/react-label";
import { PrimitiveLabelProps } from "@radix-ui/react-label";

type LabelProps = PrimitiveLabelProps & {
  idOfControl: string;
  labelText: string;
};

function Label({ idOfControl, labelText }: LabelProps) {
  return (
    <LabelPrimitive.Root htmlFor={idOfControl}>{labelText}</LabelPrimitive.Root>
  );
}

export default Label;
