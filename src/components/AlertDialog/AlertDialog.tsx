import { useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { RequireAtLeastOne } from "../../types/Global";
import styled from "styled-components";

const Overlay = styled(AlertDialogPrimitive.Overlay)`
  background-color: rgba(0, 0, 0, 0.447);
  position: fixed;
  inset: 0;
`;

const Content = styled(AlertDialogPrimitive.Content)`
  background-color: var(--light-greyish-purple);
  color: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px #1b0f24;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;

  :focus {
    outline: none;
  }
`;

const Title = styled(AlertDialogPrimitive.Title)`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.25rem;
  font-weight: 500;
`;

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
  z-index: 5000;
`;

type UncontrolledDialogProps = {
  defaultOpen: boolean;
};

type ControlledDialogProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

type PropsWithControlChoice = {
  controlledSettings?: ControlledDialogProps;
  uncontrolledSettings?: UncontrolledDialogProps;
  title: string;
  programmaticTrigger?: boolean;
  description?: string | React.ReactNode;
  confirmText: string;
  cancelText: string;
  onCancelClick: (e: any) => void;
  onConfirmClick: (e: any) => void;
  addtlActionText?: string;
  showAddtlAction?: boolean;
  onAddtlActionClick?: (e: any) => void;
};

// TODO: this type isn't perfect since it doesn't check for the case where both are defined, in that case controlled will override uncontrolled
type Props = RequireAtLeastOne<
  PropsWithControlChoice,
  "controlledSettings" | "uncontrolledSettings"
>;

// TODO: improve trigger button or pass in trigger component as prop instead (more likely)
function AlertDialog({
  controlledSettings,
  uncontrolledSettings = { defaultOpen: false },
  programmaticTrigger = true,
  title,
  description,
  confirmText,
  cancelText,
  onConfirmClick,
  onCancelClick,
  addtlActionText,
  showAddtlAction = false,
  onAddtlActionClick,
}: Props) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <AlertDialogPrimitive.Root
        {...controlledSettings}
        {...uncontrolledSettings}
      >
        {!programmaticTrigger && (
          <AlertDialogPrimitive.Trigger>Open</AlertDialogPrimitive.Trigger>
        )}
        <AlertDialogPrimitive.Portal container={container}>
          <Overlay />
          <Content>
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
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
      <PortalContainer id="alert-dialog-portal-root" ref={setContainer} />
    </>
  );
}

export default AlertDialog;
