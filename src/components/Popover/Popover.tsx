import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContentProps } from "@radix-ui/react-popover";
import styled from "styled-components";

const Content = styled(motion.div)`
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
`;

const Arrow = styled(PopoverPrimitive.Arrow)`
  fill: var(--darkest-purple);
`;

export const PopoverRoot = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverRef = HTMLDivElement;

type PopoverProps = PopoverContentProps & {
  isOpen: boolean;
};

// TODO: pass in custom bg color
const PopoverContent = forwardRef<PopoverRef, PopoverProps>(
  ({ isOpen, children, ...props }, forwardedRef) => {
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {children}
                <Arrow />
              </Content>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  }
);
export default PopoverContent;
