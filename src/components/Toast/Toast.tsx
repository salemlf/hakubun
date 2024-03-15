import * as ToastPrimitive from "@radix-ui/react-toast";
import { motion } from "framer-motion";
import {
  ActionProps,
  ToastPropsWithCustomContent,
  ToastType,
} from "./Toast.types";
import SvgIcon from "../SvgIcon";
import CloseIcon from "../../images/close.svg?react";
import ErrorIcon from "../../images/error.svg?react";
import InfoIcon from "../../images/info.svg?react";
import SuccessIcon from "../../images/success.svg?react";
import WarningIcon from "../../images/warning.svg?react";
import LoadingIcon from "../../images/loading.svg?react";
import styled from "styled-components";

type RootProps = {
  bgcolor: string;
  textcolor: string;
};

const Root = styled(ToastPrimitive.Root)<RootProps>`
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  column-gap: 15px;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
`;

const Title = styled(ToastPrimitive.Title)`
  font-weight: 500;
  font-size: 1.25rem;
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
  margin-left: 3px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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
  // icon: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
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

interface CustomToastProps extends ToastPropsWithCustomContent {
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
  let ToastIcon = toastStyles.icon;

  return (
    <Root
      duration={timeout}
      bgcolor={toastStyles.bgColor}
      textcolor={toastStyles.textColor}
      open={open}
      onOpenChange={setOpen}
      forceMount={true}
      asChild
      data-testid={`${toastType}-toast`}
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
                <SvgIcon icon={<ToastIcon />} width="2.25em" height="2.25em" />
                <Title>{title}</Title>
              </TitleContainer>
            )}
            {allowClose && (
              <CloseButton aria-label="Close">
                <SvgIcon icon={<CloseIcon />} width="2.25em" height="2.25em" />
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
