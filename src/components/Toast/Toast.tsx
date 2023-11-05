// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ToastProps } from "@radix-ui/react-toast";
import { motion } from "framer-motion";
import { ActionProps, ToastType } from "./types";
import CloseIcon from "../../images/close.svg";
import ErrorIcon from "../../images/error.svg";
import InfoIcon from "../../images/info.svg";
import SuccessIcon from "../../images/success.svg";
import WarningIcon from "../../images/warning.svg";
import LoadingIcon from "../../images/loading.svg";
import styled from "styled-components";

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
  loading: {
    bgColor: "var(--darkest-purple)",
    textColor: "white",
    icon: LoadingIcon,
  },
};

interface CustomToastProps extends ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action?: ActionProps;
  timeout: number;
  toastType: ToastType;
  allowClose?: boolean;
}

// TODO: change animation so on swipe it slides out
export const Toast = ({
  open,
  setOpen,
  title,
  content,
  toastType,
  action,
  timeout,
  allowClose = true,
}: CustomToastProps) => {
  let toastStyles = toastTypeStylesMap[toastType];
  let toastIcon = toastStyles.icon;

  return (
    <Root
      duration={timeout}
      bgcolor={toastStyles.bgColor}
      textcolor={toastStyles.textColor}
      open={open}
      onOpenChange={setOpen}
      forceMount={true}
      asChild
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{
          x: "0%",
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: 1,
          },
        }}
        exit={{ opacity: 0 }}
      >
        <>
          <HeaderContainer>
            {title && (
              <TitleContainer>
                <TitleIcon src={toastIcon} />
                <Title>{title}</Title>
              </TitleContainer>
            )}
            {allowClose && (
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
      </motion.div>
    </Root>
  );
};

export default Toast;
