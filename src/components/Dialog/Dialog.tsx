import { forwardRef } from "react";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import CloseIcon from "../../images/close.svg";
import styled from "styled-components";

const CloseButton = styled(DialogPrimitive.Close)`
  padding: 10px;
`;

const Close = styled(IonIcon)`
  width: 2.25em;
  height: 2.25em;
`;

const Overlay = styled(DialogPrimitive.Overlay)`
  background-color: var(--dark-greyish-purple);
  position: fixed;
  inset: 0;
`;

const Content = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
`;

const Title = styled(DialogPrimitive.Title)`
  margin: 0;
  font-weight: 500;
  color: black;
  font-size: 1.2rem;
`;

const Description = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  color: black;
  font-size: 1rem;
  line-height: 1.5;
`;

type DialogContentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

type DialogContentRef = HTMLDivElement;

export const DialogContent = forwardRef<DialogContentRef, DialogContentProps>(
  ({ title, description, children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <Overlay />
      <Content {...props} ref={forwardedRef}>
        <Title>{title}</Title>
        <Description className="DialogDescription">{description}</Description>
        {children}
        <CloseButton aria-label="Close">
          <Close src={CloseIcon} />
        </CloseButton>
      </Content>
    </DialogPrimitive.Portal>
  )
);

export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export default DialogContent;
