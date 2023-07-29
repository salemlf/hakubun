import {
  JSXElementConstructor,
  ReactElement,
  RefObject,
  cloneElement,
  useRef,
} from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import styled from "styled-components/macro";

// TODO: add styles to underlay (position: fixed; inset: 0;) depending on isModal state
const Underlay = styled.div``;

const Arrow = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--ion-color-primary);
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);

  &[data-placement="top"] {
    top: 100%;
    transform: translateX(-50%) rotate(180deg);
  }

  &[data-placement="bottom"] {
    bottom: 100%;
    transform: translateX(-50%);
  }

  &[data-placement="left"] {
    left: 100%;
    transform: translateY(-50%) rotate(90deg);
  }

  &[data-placement="right"] {
    right: 100%;
    transform: translateY(-50%) rotate(-90deg);
  }
`;

const PopoverStyled = styled.div`
  background: var(--ion-color-primary);
  border: 1px solid var(--darkest-purple);
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 6px;
`;

interface PopoverContentProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  showArrow: boolean;
}

function PopoverContent({
  children,
  state,
  offset = 8,
  showArrow,
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
      <Underlay {...underlayProps} className="underlay" />
      <PopoverStyled {...popoverProps} ref={popoverRef} className="popover">
        {showArrow && <Arrow {...arrowProps} data-placement={placement} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </PopoverStyled>
    </Overlay>
  );
}

type PopoverProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  triggerRef: RefObject<Element>;
  isPopoverOpen: boolean;
  allowOutsideInteractions?: boolean;
  showArrow?: boolean;
};

function Popover({
  children,
  triggerRef,
  isPopoverOpen,
  allowOutsideInteractions = true,
  showArrow = false,
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
          showArrow={showArrow}
        >
          {cloneElement(children, overlayProps)}
        </PopoverContent>
      )}
    </>
  );
}

export default Popover;
