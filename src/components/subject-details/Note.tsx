import { useEffect, useRef, useState } from "react";
import { IonIcon, useIonAlert } from "@ionic/react";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";

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
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import { Subject } from "../../types/Subject";
import { capitalizeWord } from "../../services/MiscService";

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
  bottom: -20px;
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

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
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

const EditableNote = styled.textarea`
  resize: none;
  width: 100%;
  background-color: var(--light-grey);
  line-height: 1;
  padding: 3px 2px;
  margin: 0;
  display: block;
  border: none;
`;

const NoteContents = styled.div`
  width: 100%;
  background-color: var(--light-grey);
  line-height: 1;
  padding: 3px 2px;
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

// TODO: change so just passing in studyMaterial, not meaningNote also
type Props = {
  subject: Subject;
  studyMaterial: StudyMaterialDataResponse;
  meaningNote: string;
  beganEditing: boolean;
  setEditingInProgress: (isEditing: boolean) => void;
  noteType: "meaning" | "reading";
};

// TODO: make a generic version of this component so can be used for user reading note also
export const Note = ({
  subject,
  studyMaterial,
  meaningNote,
  setEditingInProgress,
  beganEditing,
  noteType,
}: Props) => {
  const { addMeaningNote, removeMeaningNote } = useStudyMaterialsChange();
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
  const [presentAlert] = useIonAlert();
  let noteTypeCapitalized = capitalizeWord(noteType);

  const handleTextAreaUpdate = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let val = evt.target ? evt.target.value : "";
    setTextValue(val);
  };

  type CompleteEditParams = {
    saveEdit: boolean;
    remove: boolean;
  };

  const completeEditing = ({ saveEdit, remove }: CompleteEditParams) => {
    if (saveEdit) {
      remove
        ? removeMeaningNote(subject, studyMaterial)
        : addMeaningNote(subject, studyMaterial, textValue);

      // TODO: this is a meh workaround to avoid the add button flashing while waiting for the mutation to complete
      // TODO: possibly modify to wait for settled promise in useStudyMaterials
      setTimeout(() => {
        setEditingInProgress(false);
        setIsEditable(false);
      }, 1000);
    } else {
      setTextValue(meaningNote);
      setEditingInProgress(false);
      setIsEditable(false);
    }
  };

  return (
    <NoteContainer>
      <IconHeadingContainer>
        <NoteIconStyled src={NoteIcon} />
        <NoteHintHeading>Meaning Note</NoteHintHeading>
      </IconHeadingContainer>
      {isEditable ? (
        <EditableNote
          onChange={handleTextAreaUpdate}
          ref={textareaRef}
          rows={1}
          value={textValue}
          disabled={isEditable ? undefined : true}
        />
      ) : (
        <NoteContents>{textValue}</NoteContents>
      )}
      <ButtonContainer>
        {isEditable ? (
          <>
            <CancelButton
              aria-label="Cancel"
              onClick={() =>
                completeEditing({ saveEdit: false, remove: false })
              }
            >
              <IonIcon src={CancelIcon} />
            </CancelButton>
            <SaveButton aria-label="Save">
              <IonIcon
                src={SaveIcon}
                onClick={() =>
                  completeEditing({ saveEdit: true, remove: false })
                }
              />
            </SaveButton>
          </>
        ) : (
          <>
            <TrashButton aria-label="Delete">
              <IonIcon
                src={TrashIcon}
                onClick={() =>
                  presentAlert({
                    header: `Delete ${noteTypeCapitalized}`,
                    message: `Delete ${noteType} note?`,
                    cssClass: "custom-alert",
                    buttons: [
                      {
                        text: "Cancel",
                        role: "cancel",
                      },
                      {
                        text: "Delete",
                        role: "destructive",
                        handler: () => {
                          completeEditing({ saveEdit: true, remove: true });
                        },
                      },
                    ],
                  })
                }
              />
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
