import React from "react";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ToastProps } from "@radix-ui/react-toast";
import { ToastType } from "./types";
import CloseIcon from "../../images/close.svg";
import ErrorIcon from "../../images/error.svg";
import InfoIcon from "../../images/info.svg";
import SuccessIcon from "../../images/success.svg";
import WarningIcon from "../../images/warning.svg";
import styled from "styled-components";

type ViewportProps = {
  distancefrombottom: string;
};

const Viewport = styled(ToastPrimitive.Viewport)<ViewportProps>`
  position: fixed;
  bottom: ${({ distancefrombottom }) => distancefrombottom};
  left: 50%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  width: 380px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  transform: translate(-50%, 0);
  outline: none;
  z-index: 20;
`;

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
  column-gap: 15px;
  align-items: center;
`;

const Title = styled(ToastPrimitive.Title)`
  font-weight: 500;
  font-size: 1.25rem;
`;

const TitleIcon = styled(IonIcon)`
  width: 2.25em;
  height: 2.25em;
`;

const Description = styled(ToastPrimitive.Description)`
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
`;

const CloseButton = styled(ToastPrimitive.Close)`
  align-self: baseline;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
`;

const Close = styled(IonIcon)`
  width: 2.25em;
  height: 2.25em;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

type ToastStyles = {
  bgColor: string;
  textColor: string;
  icon: string;
};

const toastTypeStylesMap: { [index: string]: ToastStyles } = {
  info: {
    bgColor: "var(--ion-color-primary)",
    textColor: "white",
    icon: InfoIcon,
  },
  success: {
    bgColor: "var(--ion-color-success)",
    textColor: "black",
    icon: SuccessIcon,
  },
  warning: {
    bgColor: "var(--ion-color-warning)",
    textColor: "black",
    icon: WarningIcon,
  },
  error: {
    bgColor: "var(--ion-color-danger)",
    textColor: "white",
    icon: ErrorIcon,
  },
};

interface ActionProps {
  altText: string;
  children: React.ReactNode;
}

interface Props extends ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action?: ActionProps;
  showClose?: boolean;
  distanceFromBottom?: string;
  duration?: number;
  toastType: ToastType;
}

// TODO: add animation on entrance and exit
const Toast = ({
  open,
  setOpen,
  title,
  content,
  action,
  distanceFromBottom = "85px",
  duration = 10000,
  showClose = true,
  ...props
}: Props) => {
  let toastStyles = toastTypeStylesMap[props.toastType];
  let toastIcon = toastStyles.icon;
  // TODO: set icon based on toast type

  return (
    <>
      <Root
        duration={duration}
        bgcolor={toastStyles.bgColor}
        textcolor={toastStyles.textColor}
        {...props}
        open={open}
        onOpenChange={setOpen}
      >
        <>
          <HeaderContainer>
            {title && (
              <TitleContainer>
                <TitleIcon src={toastIcon} />
                <Title>{title}</Title>
              </TitleContainer>
            )}
            {showClose && (
              <CloseButton aria-label="Close">
                <Close src={CloseIcon} />
              </CloseButton>
            )}
          </HeaderContainer>
          <Description>{content}</Description>
          {action && action.children && (
            <ToastPrimitive.Action asChild altText={action.altText}>
              {action.children}
            </ToastPrimitive.Action>
          )}
        </>
      </Root>
      <Viewport distancefrombottom={distanceFromBottom} />
    </>
  );
};

export default Toast;
