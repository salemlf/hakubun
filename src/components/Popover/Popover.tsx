import {
  JSXElementConstructor,
  ReactElement,
  RefObject,
  cloneElement,
  useRef,
  useState,
} from "react";
import { DismissButton, Overlay, useButton, usePopover } from "react-aria";
import type { AriaPopoverProps, Placement } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

interface PopoverContentProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

function PopoverContent({
  children,
  state,
  offset = 8,
  ...props
}: PopoverContentProps) {
  let popoverRef = useRef(null);
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div {...popoverProps} ref={popoverRef} className="popover">
        <svg {...arrowProps} className="arrow" data-placement={placement}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

type PopoverProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  triggerRef: RefObject<Element>;
  isPopoverOpen: boolean;
  allowOutsideInteractions?: boolean;
};

function Popover({
  children,
  triggerRef,
  isPopoverOpen,
  allowOutsideInteractions = true,
}: PopoverProps) {
  const state = useOverlayTriggerState({ isOpen: isPopoverOpen });
  const { overlayProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      {isPopoverOpen && (
        <PopoverContent
          {...overlayProps}
          state={state}
          triggerRef={triggerRef}
          isNonModal={allowOutsideInteractions}
        >
          {cloneElement(children, overlayProps)}
        </PopoverContent>
      )}
    </>
  );
}

export default Popover;
