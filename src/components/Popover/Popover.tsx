import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContentProps } from "@radix-ui/react-popover";
import styled from "styled-components";

const ARROW_WIDTH = 20;
const ARROW_HEIGHT = 10;

type ContentAndArrowProps = {
  contentbgcolor: string;
  $showborder: boolean;
};

const Content = styled(motion.div)<ContentAndArrowProps>`
  border-radius: 12px;
  background-color: ${({ contentbgcolor }) => contentbgcolor};
  color: white;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  a {
    color: var(--ion-color-primary-lightest);
  }
  border: ${({ $showborder }) => $showborder && "2px solid black"};
`;

const Arrow = styled(PopoverPrimitive.Arrow)<ContentAndArrowProps>`
  fill: ${({ contentbgcolor }) => contentbgcolor};

  polygon {
    stroke: ${({ $showborder, contentbgcolor }) =>
      $showborder ? "black" : contentbgcolor};
    stroke-dasharray: ${({ $showborder }) => $showborder && "0 28 16"};
    stroke-width: ${({ $showborder }) => $showborder && "2px"};
  }
`;

export const PopoverRoot = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverRef = HTMLDivElement;

type PopoverProps = PopoverContentProps & {
  isOpen: boolean;
  contentBgColor?: string;
  showBorder?: boolean;
};

const PopoverContent = forwardRef<PopoverRef, PopoverProps>(
  (
    {
      isOpen,
      children,
      contentBgColor = "var(--darkest-purple)",
      showBorder = false,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <PopoverPrimitive.Portal forceMount>
            <PopoverPrimitive.Content
              asChild
              ref={forwardedRef}
              sideOffset={5}
              {...props}
              side="top"
            >
              <Content
                contentbgcolor={contentBgColor}
                $showborder={showBorder}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {children}
                <Arrow
                  contentbgcolor={contentBgColor}
                  $showborder={showBorder}
                  width={ARROW_WIDTH}
                  height={ARROW_HEIGHT}
                />
              </Content>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  }
);
export default PopoverContent;
