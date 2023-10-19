import * as React from "react";
import styled from "styled-components";

type SvgWrapperProps = {
  svgwidth: string;
  svgheight: string;
};

const SvgWrapper = styled.i<SvgWrapperProps>`
  display: flex;
  justify-content: center;
  svg {
    width: ${({ svgwidth }) => svgwidth};
    height: ${({ svgheight }) => svgheight};
  }
`;

interface IProps {
  icon: React.ReactNode;
  width?: string;
  height?: string;
}

function SvgIcon({ icon, width = "1em", height = "1em" }: IProps) {
  return (
    <SvgWrapper svgwidth={width} svgheight={height}>
      {icon}
    </SvgWrapper>
  );
}

export default SvgIcon;
