import { forwardRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AnimatePresence } from "framer-motion";
import { useModalContainer } from "../../hooks/useModalContainer";
import { Content, Overlay } from "../Modal/Modal.styles";
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

const Description = styled(AlertDialogPrimitive.Description)`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-color);
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
  border: 1px solid black;

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
`;

const ConfirmButton = styled(DialogButton)`
  background-color: var(--ion-color-danger);
  color: white;
`;

const CancelButton = styled(DialogButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
`;

const MiscButton = styled(DialogButton)`
  background-color: var(--ion-color-primary);
  color: white;
`;

const Title = styled(AlertDialogPrimitive.Title)`
  margin: 10px 0;
  font-size: 1.5rem;
`;

const DELAY = 0.3;
type ContentRef = HTMLDivElement;

type AlertModalContentProps = {
  modalID: string;
  isOpen: boolean;
  title: string;
  description?: string | React.ReactNode;
  confirmText: string;
  onConfirmClick: () => void;
  cancelText: string;
  onCancelClick: () => void;
  showAddtlAction?: boolean;
  addtlActionText?: string;
  onAddtlActionClick?: () => void;
};

export const AlertModalContent = forwardRef<ContentRef, AlertModalContentProps>(
  (
    {
      modalID,
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
    const { modalContainerRef } = useModalContainer(modalID, isOpen);

    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <>
              <AlertDialogPrimitive.Portal
                forceMount
                container={modalContainerRef.current}
              >
                <AlertDialogPrimitive.Overlay asChild>
                  <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: DELAY } }}
                    exit={{ opacity: 0 }}
                  />
                </AlertDialogPrimitive.Overlay>
                <AlertDialogPrimitive.Content
                  {...props}
                  ref={forwardedRef}
                  forceMount
                  asChild
                >
                  <Content
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: DELAY } }}
                    exit={{ scale: 0 }}
                    className="modal-content"
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
                </AlertDialogPrimitive.Content>
              </AlertDialogPrimitive.Portal>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
);

AlertModal.Trigger = AlertDialogPrimitive.Trigger;
AlertModal.Content = AlertModalContent;

export default AlertModal;
