import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContentProps } from "@radix-ui/react-popover";
import styled from "styled-components";

const Content = styled(PopoverPrimitive.Content)`
  border-radius: 10px;
  padding: 20px;
  width: 260px;
  background-color: var(--darkest-purple);
  color: white;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  a {
    color: var(--ion-color-primary-lightest);
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
  fill: var(--darkest-purple);
`;

export const PopoverRoot = PopoverPrimitive.Root;

export const PopoverTrigger = styled(PopoverPrimitive.Trigger)`
  all: unset;

  &:focus-visible {
    outline: 2px solid white;
  }
`;

type PopoverRef = HTMLDivElement;

// TODO: improve styles
const PopoverContent = React.forwardRef<PopoverRef, PopoverContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <Content sideOffset={5} {...props} ref={forwardedRef} side="top">
        {children}
        <Arrow />
      </Content>
    </PopoverPrimitive.Portal>
  )
);
export default PopoverContent;
