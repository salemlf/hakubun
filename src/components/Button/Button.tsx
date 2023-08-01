import { useRef } from "react";
import { useButton } from "react-aria";
import { AriaButtonProps } from "@react-types/button";
import styled from "styled-components/macro";

type ButtonContainerProps = {
  isPressed: boolean;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  border-radius: 10px;
  background-color: ${({ isPressed }) =>
    isPressed ? "var(--ion-color-primary-shade)" : `var(--ion-color-primary)`};
  color: white;
  padding: 6px 8px;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

// TODO: allow passing in button bgcolor and color
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
    <ButtonContainer
      {...buttonProps}
      ref={ref}
      isPressed={isPressed}
      tabIndex={0}
    >
      {children}
    </ButtonContainer>
  );
}

export default Button;
