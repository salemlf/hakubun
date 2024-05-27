import { CSSProperties, forwardRef } from "react";
import { useButton, useObjectRef } from "react-aria";
import { AriaButtonProps } from "@react-types/button";
import styled from "styled-components";

type ButtonContainerProps = {
  backgroundcolor?: string;
  color?: string;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  background-color: ${({ backgroundcolor }) =>
    backgroundcolor && `${backgroundcolor}`};
  color: ${({ color }) => color && `${color}`};
`;

interface Props extends AriaButtonProps {
  backgroundColor?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      backgroundColor = "var(--button-color)",
      color = "var(--button-text-color)",
      className,
      style,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const { children } = props;
    const ref = useObjectRef(forwardedRef);
    const { buttonProps } = useButton(
      {
        ...props,
        elementType: "button",
      },
      ref
    );

    return (
      <ButtonContainer
        {...buttonProps}
        className={className}
        backgroundcolor={backgroundColor}
        color={color}
        ref={ref}
        tabIndex={0}
        style={style}
        disabled={disabled}
      >
        {children}
      </ButtonContainer>
    );
  }
);

export default Button;
