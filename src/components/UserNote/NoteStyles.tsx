import { IonIcon } from "@ionic/react";
import { NoteHintContainer } from "../../styles/BaseStyledComponents";
import Button from "../Button";
import styled from "styled-components";

export const NoteContainer = styled(NoteHintContainer)`
  position: relative;
  padding-bottom: 18px;
`;

export const NoteIconStyled = styled(IonIcon)`
  margin-right: 5px;
  vertical-align: text-top;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 5px;
  bottom: -20px;
`;

export const EditingButton = styled(Button)`
  padding: 7px;
  border-radius: 50%;

  ion-icon {
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

export const TrashButton = styled(EditingButton)`
  background-color: var(--ion-color-danger-tint);
  color: white;
  margin-right: 15px;
`;

export const PencilButton = styled(EditingButton)`
  background-color: var(--ion-color-primary);
  color: white;
`;

export const SaveButton = styled(EditingButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
`;

export const CancelButton = styled(EditingButton)`
  background-color: var(--ion-color-warning);
  color: black;
  margin-right: 15px;
`;

export const EditableNote = styled.textarea`
  resize: none;
  width: 100%;
  background-color: var(--secondary-foreground-color);
  line-height: 1;
  padding: 3px 2px;
  margin: 0;
  display: block;
  border: none;

  &::selection {
    background-color: var(--ion-color-primary);
    color: black;
  }
`;

export const NoteContents = styled.div`
  width: 100%;
  background-color: var(--secondary-foreground-color);
  line-height: 1.5;
  padding: 3px 2px;
  margin: 0;
  display: block;
  border: none;

  &::selection {
    background-color: var(--ion-color-primary);
    color: black;
  }
`;
