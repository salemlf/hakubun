import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import SvgIcon from "../SvgIcon";
import SunIcon from "../../images/sun.svg?react";
import MoonIcon from "../../images/moon.svg?react";
import styled from "styled-components";

const ThemeIconWrapper = styled.div`
  position: absolute;
`;

const MoonIconWrapper = styled(ThemeIconWrapper)`
  left: 5px;
`;

const SunIconWrapper = styled(ThemeIconWrapper)`
  right: 5px;
`;

const Root = styled(SwitchPrimitive.Root)`
  position: relative;
  width: 80px;
  height: 37px;
  background-image: linear-gradient(
    45deg,
    hsl(320deg 100% 50%) 0%,
    hsl(326deg 100% 53%) 11%,
    hsl(336deg 100% 59%) 22%,
    hsl(347deg 100% 64%) 33%,
    hsl(2deg 100% 68%) 44%,
    hsl(15deg 100% 64%) 56%,
    hsl(26deg 100% 61%) 67%,
    hsl(34deg 100% 58%) 78%,
    hsl(41deg 100% 56%) 89%,
    hsl(46deg 100% 57%) 100%
  );
  border-radius: 9999px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;

  &[data-state="checked"] {
    background-image: linear-gradient(
      45deg,
      hsl(263deg 59% 30%) 0%,
      hsl(265deg 55% 34%) 11%,
      hsl(267deg 52% 39%) 22%,
      hsl(269deg 50% 43%) 33%,
      hsl(271deg 47% 47%) 44%,
      hsl(273deg 49% 52%) 56%,
      hsl(274deg 56% 56%) 67%,
      hsl(276deg 66% 61%) 78%,
      hsl(277deg 78% 65%) 89%,
      hsl(279deg 93% 70%) 100%
    );
    justify-content: flex-end;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }
`;

const Toggle = styled(motion.span)`
  display: inline-block;
  width: 33px;
  height: 33px;
  background-color: white;
  border-radius: 9999px;
  border: 1px solid black;
`;

type Props = {
  isSwitchedOn: boolean;
  setIsSwitchedOn: (isSwitchedOn: boolean) => void;
  labelId: string;
};

function ColorThemeSwitch({ isSwitchedOn, setIsSwitchedOn, labelId }: Props) {
  return (
    <Root checked={isSwitchedOn} onCheckedChange={setIsSwitchedOn} id={labelId}>
      {isSwitchedOn ? (
        <MoonIconWrapper>
          <SvgIcon icon={<MoonIcon />} width="1.75em" height="1.75em" />
        </MoonIconWrapper>
      ) : (
        <SunIconWrapper>
          <SvgIcon icon={<SunIcon />} width="1.75em" height="1.75em" />
        </SunIconWrapper>
      )}
      <SwitchPrimitive.Thumb asChild>
        <Toggle
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

export default ColorThemeSwitch;
