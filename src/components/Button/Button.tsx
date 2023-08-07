import { useRef } from "react";
import { useButton } from "react-aria";
import { AriaButtonProps } from "@react-types/button";
// import styled from "styled-components/macro";
import styled from "styled-components";

type ButtonContainerProps = {
  isPressed: boolean;
  backgroundcolor: string;
  color: string;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  border-radius: 10px;
  background-color: ${({ backgroundcolor }) => `${backgroundcolor}`};
  color: ${({ color }) => `${color}`};
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

interface Props extends AriaButtonProps {
  backgroundColor?: string;
  color?: string;
}

// TODO: allow passing in button bgcolor and color
function Button({
  backgroundColor = "var(--ion-color-primary)",
  color = "white",
  ...props
}: Props) {
  let { children } = props;
  let ref = useRef(null);
  let { buttonProps, isPressed } = useButton(
    {
      ...props,
      elementType: "button",
    },
    ref
  );

  return (
    <ButtonContainer
      backgroundcolor={backgroundColor}
      color={color}
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
