import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RequireAtLeastOne } from "../../types/Global";
import styled from "styled-components";

const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.447);
  position: fixed;
  inset: 0;
`;

const Content = styled(AlertDialog.Content)`
  background-color: var(--ion-color-secondary);
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

const Title = styled(AlertDialog.Title)`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.25rem;
  font-weight: 500;
`;

const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  padding-top: 10px;
`;

const DialogButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  height: 35px;

  &:focus {
    outline: 2px solid white;
  }
`;

const ConfirmButton = styled(DialogButton)`
  background-color: var(--ion-color-primary);
`;

const CancelButton = styled(DialogButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
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
  description?: string;
  confirmText: string;
  cancelText: string;
  onCancelClick: (e: any) => void;
  onConfirmClick: (e: any) => void;
};

// TODO: this type isn't perfect since it doesn't check for the case where both are defined, in that case controlled will override uncontrolled
type Props = RequireAtLeastOne<
  PropsWithControlChoice,
  "controlledSettings" | "uncontrolledSettings"
>;

// TODO: improve trigger button or pass in trigger component as prop instead (more likely)
function Dialog({
  controlledSettings,
  uncontrolledSettings,
  programmaticTrigger = true,
  title,
  description,
  confirmText,
  cancelText,
  onConfirmClick,
  onCancelClick,
}: Props) {
  return (
    <AlertDialog.Root {...controlledSettings} {...uncontrolledSettings}>
      {!programmaticTrigger && <AlertDialog.Trigger>Open</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          <ButtonContainer>
            <AlertDialog.Cancel asChild>
              <CancelButton onClick={onCancelClick}>{cancelText}</CancelButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <ConfirmButton onClick={onConfirmClick}>
                {confirmText}
              </ConfirmButton>
            </AlertDialog.Action>
          </ButtonContainer>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Dialog;
