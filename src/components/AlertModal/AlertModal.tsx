import { useState, forwardRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function AlertModal({ open, onOpenChange, children }: Props) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </AlertDialogPrimitive.Root>
  );
}

const OverlayPrimitive = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.447);
  inset: 0;
`;

const ContentPrimitive = styled(AlertDialogPrimitive.Content)`
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

const Content = styled(motion.div)``;
const Description = styled(AlertDialogPrimitive.Description)`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
  flex-wrap: wrap;
`;

const DialogButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.9rem;
  line-height: 1;
  font-weight: 500;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const ConfirmButton = styled(DialogButton)`
  background-color: var(--ion-color-danger);
`;

const CancelButton = styled(DialogButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
`;

const MiscButton = styled(DialogButton)`
  background-color: var(--ion-color-primary);
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

const Title = styled(AlertDialogPrimitive.Title)`
  margin: 10px 0;
  font-size: 1.5rem;
`;

type ContentRef = HTMLDivElement;

type AlertModalContentProps = {
  isOpen: boolean;
  title: string;
  description?: string | React.ReactNode;
  confirmText: string;
  onConfirmClick: (e: any) => void;
  cancelText: string;
  onCancelClick: (e: any) => void;
  showAddtlAction?: boolean;
  addtlActionText?: string;
  onAddtlActionClick?: (e: any) => void;
};

export const AlertModalContent = forwardRef<ContentRef, AlertModalContentProps>(
  (
    {
      title,
      description,
      isOpen,
      confirmText,
      onConfirmClick,
      cancelText,
      onCancelClick,
      showAddtlAction,
      addtlActionText,
      onAddtlActionClick,
      ...props
    },
    forwardedRef
  ) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <AlertDialogPrimitive.Portal forceMount container={container}>
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
                  <Title>{title}</Title>
                  {description && <Description>{description}</Description>}
                  <ButtonContainer>
                    <AlertDialogPrimitive.Cancel asChild>
                      <CancelButton onClick={onCancelClick}>
                        {cancelText}
                      </CancelButton>
                    </AlertDialogPrimitive.Cancel>
                    <AlertDialogPrimitive.Action asChild>
                      <ConfirmButton onClick={onConfirmClick}>
                        {confirmText}
                      </ConfirmButton>
                    </AlertDialogPrimitive.Action>
                    {showAddtlAction && (
                      <AlertDialogPrimitive.Action asChild>
                        <MiscButton onClick={onAddtlActionClick}>
                          {addtlActionText}
                        </MiscButton>
                      </AlertDialogPrimitive.Action>
                    )}
                  </ButtonContainer>
                </Content>
              </ContentPrimitive>
            </AlertDialogPrimitive.Portal>
          )}
        </AnimatePresence>
        <PortalContainer id="alert-modal-portal-root" ref={setContainer} />
      </>
    );
  }
);

AlertModal.Trigger = AlertDialogPrimitive.Trigger;
AlertModal.Content = AlertModalContent;

export default AlertModal;
