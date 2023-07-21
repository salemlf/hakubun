import { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import TrashIcon from "../../images/trash.svg";
import SaveIcon from "../../images/save.svg";
import CancelIcon from "../../images/cancel.svg";

import {
  NoteHintContainer,
  NoteHintHeading,
  IconHeadingContainer,
} from "../styles/BaseStyledComponents";
import styled from "styled-components/macro";

const NoteContainer = styled(NoteHintContainer)`
  position: relative;
  padding-bottom: 18px;
`;

const NoteIconStyled = styled(IonIcon)`
  margin-right: 5px;
  vertical-align: text-top;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 5px;
  bottom: -16px;
`;

const EditingButton = styled.button`
  padding: 7px;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  ion-icon {
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TrashButton = styled(EditingButton)`
  background-color: var(--ion-color-danger-tint);
  color: white;
  margin-right: 15px;
`;

const PencilButton = styled(EditingButton)`
  background-color: var(--ion-color-primary);
  color: white;
`;

const SaveButton = styled(EditingButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
`;

const CancelButton = styled(EditingButton)`
  background-color: var(--ion-color-warning);
  color: black;
  margin-right: 15px;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  background-color: var(--light-grey);
  line-height: 1;
  padding: 3px 0;
  margin: 0;
  display: block;
  border: none;
`;

// based on info in this article, who knew an expanding height textbox would be so high-maintenance lol
// article: https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      let scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

type Props = {
  meaningNote: string;
  beganEditing: boolean;
  setEditingInProgress: (isEditing: boolean) => void;
};

// TODO: on trash button click -> confirm note deletion
// TODO: update meaning note value in API
// TODO: make a generic version of this component so can be used for user reading note also
export const Note = ({
  meaningNote,
  setEditingInProgress,
  beganEditing,
}: Props) => {
  const [isEditable, setIsEditable] = useState(beganEditing);
  const [textValue, setTextValue] = useState(meaningNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textareaRef.current, textValue);
  useEffect(() => {
    if (isEditable && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditable]);

  const handleTextAreaUpdate = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let val = evt.target ? evt.target.value : "";
    setTextValue(val);
  };

  type CompleteEditParams = {
    saveEdit: boolean;
  };
  const completeEditing = ({ saveEdit }: CompleteEditParams) => {
    if (saveEdit) {
      // TODO: if saveEdit, update meaning note in API
      console.log("TODO: save the edit!");
    } else {
      setTextValue(meaningNote);
    }
    setEditingInProgress(false);
    setIsEditable(false);
  };

  return (
    <NoteContainer>
      <IconHeadingContainer>
        <NoteIconStyled src={NoteIcon} />
        <NoteHintHeading>Meaning Note</NoteHintHeading>
      </IconHeadingContainer>
      <Textarea
        onChange={handleTextAreaUpdate}
        ref={textareaRef}
        rows={1}
        value={textValue}
        disabled={isEditable ? undefined : true}
      />

      <ButtonContainer>
        {isEditable ? (
          <>
            <CancelButton
              aria-label="Cancel"
              onClick={() => completeEditing({ saveEdit: false })}
            >
              <IonIcon src={CancelIcon} />
            </CancelButton>
            <SaveButton aria-label="Save">
              <IonIcon
                src={SaveIcon}
                onClick={() => completeEditing({ saveEdit: true })}
              />
            </SaveButton>
          </>
        ) : (
          <>
            <TrashButton aria-label="Delete">
              <IonIcon src={TrashIcon} />
            </TrashButton>
            <PencilButton onClick={() => setIsEditable(true)} aria-label="Edit">
              <IonIcon src={PencilIcon} />
            </PencilButton>
          </>
        )}
      </ButtonContainer>
    </NoteContainer>
  );
};
