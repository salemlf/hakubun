import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getSwitchSize } from "./Switch.service";
import { SwitchSize } from "./Switch.types";

type RootProps = {
  rootwidth: string;
  rootheight: string;
};

const Root = styled(SwitchPrimitive.Root)<RootProps>`
  width: ${({ rootwidth }) => `${rootwidth}`};
  height: ${({ rootheight }) => `${rootheight}`};
  background-color: var(--ion-color-danger);
  border-radius: 9999px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;

  &[data-state="checked"] {
    background-color: var(--ion-color-tertiary);
    justify-content: flex-end;
  }
`;

type ToggleProps = {
  togglewidth: string;
  toggleheight: string;
};

const Toggle = styled(motion.span)<ToggleProps>`
  display: inline-block;
  width: ${({ togglewidth }) => `${togglewidth}`};
  height: ${({ toggleheight }) => `${toggleheight}`};
  background-color: white;
  border-radius: 9999px;
  border: 1px solid black;
`;

type Props = {
  isSwitchedOn: boolean;
  setIsSwitchedOn: (isSwitchedOn: boolean) => void;
  size: SwitchSize;
  labelId: string;
};

function Switch({ isSwitchedOn, setIsSwitchedOn, size, labelId }: Props) {
  let switchSize = getSwitchSize(size);

  return (
    <Root
      checked={isSwitchedOn}
      onCheckedChange={setIsSwitchedOn}
      id={labelId}
      rootwidth={switchSize.rootSize.width}
      rootheight={switchSize.rootSize.height}
    >
      <SwitchPrimitive.Thumb asChild>
        <Toggle
          togglewidth={switchSize.toggleSize.width}
          toggleheight={switchSize.toggleSize.height}
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        />
      </SwitchPrimitive.Thumb>
    </Root>
  );
}

export default Switch;
