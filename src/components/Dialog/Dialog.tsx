import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RequireAtLeastOne } from "../../types/Global";
import styled from "styled-components";

const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.447);
  position: fixed;
  inset: 0;
`;

const Content = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
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
  color: black;
  font-size: 1rem;
  font-weight: 500;
`;

const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: black;
  font-size: 15px;
  line-height: 1.5;
`;

const DialogButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
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

function Dialog({
  controlledSettings,
  uncontrolledSettings,
  title,
  description,
  confirmText,
  cancelText,
  onConfirmClick,
  onCancelClick,
}: Props) {
  return (
    <AlertDialog.Root {...controlledSettings} {...uncontrolledSettings}>
      <AlertDialog.Trigger>Open</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          <form>
            <AlertDialog.Cancel asChild>
              <DialogButton onClick={onCancelClick}>{cancelText}</DialogButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <DialogButton onClick={onConfirmClick}>
                {confirmText}
              </DialogButton>
            </AlertDialog.Action>
          </form>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Dialog;
