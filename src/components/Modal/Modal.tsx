import { forwardRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import SvgIcon from "../SvgIcon/SvgIcon";
import CloseIcon from "../../images/close.svg?react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Modal({ open, onOpenChange, children }: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

const OverlayPrimitive = styled(DialogPrimitive.Overlay)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.447);
  inset: 0;
`;

const ContentPrimitive = styled(DialogPrimitive.Content)`
  position: relative;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  color: white;
  width: 90vw;
  max-width: 400px;
  max-height: 85vh;
  overflow-y: auto;
  background-color: var(--light-greyish-purple);
  z-index: 5000;
`;

const ClosePrimitive = styled(DialogPrimitive.Close)`
  background-color: transparent;
  border-radius: 50%;
`;

const Content = styled(motion.div)``;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled(DialogPrimitive.Title)`
  margin: 10px 0;
  font-size: 1.5rem;
`;

const Description = styled(DialogPrimitive.Description)`
  margin: 10px 0 16px 0;
`;

const PortalContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

type ContentRef = HTMLDivElement;

type ContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
};

export const ModalContent = forwardRef<ContentRef, ContentProps>(
  ({ children, title, description, isOpen, ...props }, forwardedRef) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <DialogPrimitive.Portal forceMount container={container}>
              <OverlayPrimitive />
              <ContentPrimitive
                {...props}
                ref={forwardedRef}
                forceMount
                asChild
              >
                <Content
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <TitleBar>
                    <Title>{title}</Title>
                    <ClosePrimitive aria-label="Close">
                      <SvgIcon icon={<CloseIcon />} width="2em" height="2em" />
                    </ClosePrimitive>
                  </TitleBar>
                  {description && <Description>{description}</Description>}
                  {children}
                </Content>
              </ContentPrimitive>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
        <PortalContainer id="modal-dialog-portal-root" ref={setContainer} />
      </>
    );
  }
);

Modal.Trigger = DialogPrimitive.Trigger;
Modal.Close = DialogPrimitive.Close;
Modal.Content = ModalContent;

export default Modal;
