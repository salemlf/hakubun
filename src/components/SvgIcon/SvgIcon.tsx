import * as React from "react";
import styled from "styled-components";

type SvgWrapperProps = {
  svgwidth: string;
  svgheight: string;
  iconcolor?: string;
};

const SvgWrapper = styled.i<SvgWrapperProps>`
  display: flex;
  justify-content: center;
  color: ${({ iconcolor }) => iconcolor && iconcolor};
  svg {
    width: ${({ svgwidth }) => svgwidth};
    height: ${({ svgheight }) => svgheight};
  }
`;

interface IProps {
  icon: React.ReactNode;
  width?: string;
  height?: string;
  iconColor?: string;
}

// TODO: figure out how to use custom color for svg
function SvgIcon({ icon, width = "1em", height = "1em", iconColor }: IProps) {
  return (
    <SvgWrapper svgwidth={width} svgheight={height} iconcolor={iconColor}>
      {icon}
    </SvgWrapper>
  );
}

export default SvgIcon;
