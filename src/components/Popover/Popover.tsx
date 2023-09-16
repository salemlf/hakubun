import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContentProps } from "@radix-ui/react-popover";
import styled from "styled-components";

const Content = styled(PopoverPrimitive.Content)`
  border-radius: 4px;
  padding: 20px;
  width: 260px;
  background-color: var(--offwhite-color);
  color: black;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  a {
    color: var(--ion-color-secondary);
  }

  &:focus-visible {
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px var(--darkest-purple);
  }

  &[data-state="open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }
  &[data-state="open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }
  &[data-state="open"][data-side="bottom"] {
    animation-name: slideUpAndFade;
  }
  &[data-state="open"][data-side="left"] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Arrow = styled(PopoverPrimitive.Arrow)`
  fill: white;
`;

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverRef = HTMLDivElement;

// TODO: improve styles
const PopoverContent = React.forwardRef<PopoverRef, PopoverContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <Content sideOffset={5} {...props} ref={forwardedRef}>
        {children}
        <Arrow />
      </Content>
    </PopoverPrimitive.Portal>
  )
);
export default PopoverContent;
