import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectProps, SelectItemProps } from "@radix-ui/react-select";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import ExpandArrowIcon from "../../images/expand-arrow.svg";
import CollapseArrowIcon from "../../images/collapse-arrow.svg";
import CheckmarkIcon from "../../images/checkmark.svg";
import styled from "styled-components";

const Item = styled(SelectPrimitive.Item)`
  font-size: 1.2rem;
  line-height: 1.3;
  color: var(--darkest-purple);
  display: flex;
  gap: 5px;
  align-items: center;
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

export const SelectItem = React.forwardRef<SelectItemRef, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Item {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <ItemIndicator>
          <IonIcon src={CheckmarkIcon} />
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
  box-shadow: 0 2px 10px #1b0f24;
  text-transform: capitalize;

  /* max width so doesn't take up a crazy amount, will use ellipsis if overflow */
  max-width: 55vw;

  &:hover {
    background-color: rgb(231, 218, 240);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
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
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
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
  id: string;
};

// TODO: create a composed version of the selector where can pass in an array of items and they'll be mapped
const Selector = React.forwardRef<ButtonRef, SelectorProps>(
  ({ id, children, ...props }, forwardedRef) => {
    return (
      <SelectorRoot {...props}>
        <Trigger ref={forwardedRef} id={id}>
          <SelectPrimitive.Value />
          <Expand>
            <IonIcon src={ExpandArrowIcon} />
          </Expand>
        </Trigger>
        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectPrimitive.ScrollUpButton
              className="scrollButton"
              aria-label="Scroll up"
            >
              <IonIcon src={CollapseArrowIcon} />
            </SelectPrimitive.ScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
            <SelectPrimitive.ScrollDownButton
              className="scrollButton"
              aria-label="Scroll down"
            >
              <IonIcon src={ExpandArrowIcon} />
            </SelectPrimitive.ScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectorRoot>
    );
  }
);

export default Selector;
