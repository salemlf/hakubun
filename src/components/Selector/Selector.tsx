import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectProps, SelectItemProps } from "@radix-ui/react-select";
import SvgIcon from "../SvgIcon";
import ExpandArrowIcon from "../../images/expand-arrow.svg?react";
import CollapseArrowIcon from "../../images/collapse-arrow.svg?react";
import CheckmarkIcon from "../../images/checkmark.svg?react";
import styled from "styled-components";

const Item = styled(SelectPrimitive.Item)`
  font-size: 1.2rem;
  line-height: 1.3;
  color: var(--darkest-purple);
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  position: relative;
  user-select: none;
  text-transform: capitalize;

  &[data-disabled] {
    color: var(--dark-greyish-purple);
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: var(--ion-color-secondary-dark);
    color: white;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:not(:first-child) {
    border-top: 1px solid black;
  }
`;

const ItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  right: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

type SelectItemRef = HTMLDivElement;

export const SelectItem = forwardRef<SelectItemRef, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Item {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <ItemIndicator>
          <SvgIcon icon={<CheckmarkIcon />} width="1.25em" height="1.25em" />
        </ItemIndicator>
      </Item>
    );
  }
);

const SelectorRoot = styled(SelectPrimitive.Root)`
  button {
    all: unset;
  }
`;

const Trigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 5px 12px;
  font-size: 0.9rem;
  line-height: 1.3;
  gap: 8px;
  background-color: white;
  color: var(--darkest-purple);
  box-shadow: 0 2px 10px var(--box-shadow-color);
  text-transform: capitalize;

  /* max width so doesn't take up a crazy amount, will use ellipsis if overflow */
  max-width: 55vw;

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }

  &[data-placeholder] {
    color: var(--dark-greyish-purple);
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SelectContent = styled(SelectPrimitive.Content)`
  z-index: 5001;
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);

  .scrollButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: white;
    color: var(--darkest-purple);
    cursor: default;
  }
`;

const Expand = styled(SelectPrimitive.Icon)`
  display: flex;
`;

const SelectViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`;

type ButtonRef = HTMLButtonElement;

type SelectorProps = SelectProps & {
  open?: boolean;
  id: string;
};

// TODO: create a composed version of the selector where can pass in an array of items and they'll be mapped
const Selector = forwardRef<ButtonRef, SelectorProps>(
  ({ open, id, children, ...props }, forwardedRef) => {
    return (
      <SelectorRoot {...props} open={open}>
        <Trigger ref={forwardedRef} id={id}>
          <SelectPrimitive.Value />
          <Expand>
            <SvgIcon
              icon={<ExpandArrowIcon />}
              width="1.25em"
              height="1.25em"
            />
          </Expand>
        </Trigger>
        <SelectContent
          ref={(ref) =>
            ref?.addEventListener("touchend", (e) => e.preventDefault())
          }
        >
          <SelectPrimitive.ScrollUpButton
            className="scrollButton"
            aria-label="Scroll up"
          >
            <SvgIcon
              icon={<CollapseArrowIcon />}
              width="1.25em"
              height="1.25em"
            />
          </SelectPrimitive.ScrollUpButton>
          <SelectViewport>{children}</SelectViewport>
          <SelectPrimitive.ScrollDownButton
            className="scrollButton"
            aria-label="Scroll down"
          >
            <SvgIcon
              icon={<ExpandArrowIcon />}
              width="1.25em"
              height="1.25em"
            />
          </SelectPrimitive.ScrollDownButton>
        </SelectContent>
      </SelectorRoot>
    );
  }
);

export default Selector;
