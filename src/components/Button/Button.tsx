import { useRef } from "react";
import { useButton } from "react-aria";
import { AriaButtonProps } from "@react-types/button";
import styled from "styled-components/macro";

type ButtonContainerProps = {
  isPressed: boolean;
};

const ButtonContainer = styled.span<ButtonContainerProps>`
  display: inline-block;
  border-radius: 6px;
  background-color: ${({ isPressed }) =>
    isPressed ? "var(--ion-color-primary-shade)" : `var(--ion-color-primary)`};
  color: white;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

function Button(props: AriaButtonProps) {
  let { children } = props;
  let ref = useRef(null);
  let { buttonProps, isPressed } = useButton(
    {
      ...props,
      elementType: "span",
    },
    ref
  );

  return (
    <ButtonContainer {...buttonProps} ref={ref} isPressed={isPressed}>
      {children}
    </ButtonContainer>
  );
}

export default Button;
