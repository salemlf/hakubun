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
    backgroundcolor ? `${backgroundcolor}` : "var(--button-color)"};
  color: ${({ color }) => (color ? `${color}` : "var(--text-color)")};
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
      color = "var(--text-color)",
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
        backgroundcolor={backgroundColor}
        color={color}
        {...buttonProps}
        ref={ref}
        tabIndex={0}
        className={className}
        style={style}
        disabled={disabled}
      >
        {children}
      </ButtonContainer>
    );
  }
);

export default Button;
