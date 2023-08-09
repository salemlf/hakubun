import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ToastProps } from "@radix-ui/react-toast";
import styled from "styled-components";

const Viewport = styled(ToastPrimitive.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  transform: translate(-50%, 0);
  outline: none;
`;

export const ToastViewport = () => <Viewport />;

type RootProps = {
  bgcolor: string;
  textcolor: string;
};

const Root = styled(ToastPrimitive.Root)<RootProps>`
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title title" "description description";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
`;

const Title = styled(ToastPrimitive.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 1.25rem;
`;

const Description = styled(ToastPrimitive.Description)`
  grid-area: description;
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
`;

interface ActionProps {
  altText: string;
  children: React.ReactNode;
}

interface Props extends ToastProps {
  bgColor?: string;
  textColor?: string;
  action?: ActionProps;
  showClose?: boolean;
}

const Toast = ({
  bgColor,
  textColor,
  title,
  content,
  action,
  showClose = false,
  ...props
}: Props) => {
  const toastBgColor = bgColor ? bgColor : "var(--ion-color-secondary)";
  const toastTextColor = textColor ? textColor : "white";

  return (
    <Root bgcolor={toastBgColor} textcolor={toastTextColor} {...props}>
      {title && <Title>{title}</Title>}
      <Description>{content}</Description>
      {action && action.children && (
        <ToastPrimitive.Action asChild altText={action.altText}>
          {action.children}
        </ToastPrimitive.Action>
      )}
      {showClose && (
        <ToastPrimitive.Close aria-label="Close">
          <span aria-hidden>x</span>
        </ToastPrimitive.Close>
      )}
    </Root>
  );
};

export default Toast;
