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
  line-height: 1;
  color: var(--darkest-purple);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: var(--dark-greyish-purple);
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: var(--ion-color-secondary-dark);
    color: white;
  }
`;

const ItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  right: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 1.2rem;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: white;
  color: var(--darkest-purple);
  box-shadow: 0 2px 10px #1b0f24;

  &:hover {
    background-color: rgb(231, 218, 240);
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-placeholder] {
    color: var(--dark-greyish-purple);
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

const SelectViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`;

type ButtonRef = HTMLButtonElement;

// TODO: create a composed version of the selector where can pass in an array of items and they'll be mapped
const Selector = React.forwardRef<ButtonRef, SelectProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectorRoot {...props}>
        <Trigger ref={forwardedRef}>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <IonIcon src={ExpandArrowIcon} />
          </SelectPrimitive.Icon>
        </Trigger>
        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectPrimitive.ScrollUpButton className="scrollButton">
              <IonIcon src={CollapseArrowIcon} />
            </SelectPrimitive.ScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
            <SelectPrimitive.ScrollDownButton className="scrollButton">
              <IonIcon src={ExpandArrowIcon} />
            </SelectPrimitive.ScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectorRoot>
    );
  }
);

export default Selector;
