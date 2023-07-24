import { useEffect, useRef, useState } from "react";
import { IonIcon, useIonAlert } from "@ionic/react";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";

import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import TrashIcon from "../../images/trash.svg";
import SaveIcon from "../../images/save.svg";
import CancelIcon from "../../images/cancel.svg";
import {
  NoteHintHeading,
  IconHeadingContainer,
} from "../styles/BaseStyledComponents";
import { StudyMaterialDataResponse, UserNoteType } from "../../types/MiscTypes";
import { Subject } from "../../types/Subject";
import { capitalizeWord } from "../../services/MiscService";
import {
  EditableNote,
  NoteContents,
  NoteContainer,
  NoteIconStyled,
  ButtonContainer,
  TrashButton,
  PencilButton,
  SaveButton,
  CancelButton,
} from "./NoteStyles";

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
  subject: Subject;
  studyMaterial: StudyMaterialDataResponse;
  noteContent: string;
  beganEditing: boolean;
  setEditingInProgress: (isEditing: boolean) => void;
  noteType: UserNoteType;
  isRadical: boolean;
};

const generateNoteHeadingsAngMsg = (
  isRadical: boolean,
  noteType: UserNoteType
) => {
  let noteTypeCapitalized = capitalizeWord(noteType);

  if (isRadical) {
    return {
      noteHeadingTxt: "Note",
      alertHeadingTxt: "Delete Note",
      alertHeadingMsg: "Delete radical name note?",
    };
  } else {
    return {
      noteHeadingTxt: `${noteTypeCapitalized} Note`,
      alertHeadingTxt: `Delete ${noteTypeCapitalized}`,
      alertHeadingMsg: `Delete ${noteType} note?`,
    };
  }
};

// TODO: make a generic version of this component so can be used for user reading note also
function Note({
  subject,
  studyMaterial,
  noteContent,
  setEditingInProgress,
  beganEditing,
  noteType,
  isRadical,
}: Props) {
  const {
    addMeaningNote,
    removeMeaningNote,
    addReadingNote,
    removeReadingNote,
  } = useStudyMaterialsChange();
  let initialTextValue = noteContent ? noteContent : "";
  const [textValue, setTextValue] = useState(initialTextValue);
  const [isEditable, setIsEditable] = useState(beganEditing);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textareaRef.current, textValue);
  useEffect(() => {
    if (isEditable && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditable]);
  const [presentAlert] = useIonAlert();

  let noteHeadingsAndMsg = generateNoteHeadingsAngMsg(isRadical, noteType);

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
      if (noteType === "meaning") {
        console.log("MEANING!");
        remove
          ? removeMeaningNote(subject, studyMaterial)
          : addMeaningNote(subject, studyMaterial, textValue);
      } else {
        console.log("READING!");
        remove
          ? removeReadingNote(subject, studyMaterial)
          : addReadingNote(subject, studyMaterial, textValue);
      }

      // TODO: this is a meh workaround to avoid the add button flashing while waiting for the mutation to complete
      // TODO: possibly modify to wait for settled promise in useStudyMaterials
      setTimeout(() => {
        setEditingInProgress(false);
        setIsEditable(false);
      }, 1000);
    } else {
      setTextValue(noteContent);
      setEditingInProgress(false);
      setIsEditable(false);
    }
  };

  return (
    <NoteContainer>
      <IconHeadingContainer>
        <NoteIconStyled src={NoteIcon} />
        <NoteHintHeading>{noteHeadingsAndMsg.noteHeadingTxt}</NoteHintHeading>
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
                    header: noteHeadingsAndMsg.alertHeadingTxt,
                    message: noteHeadingsAndMsg.alertHeadingMsg,
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
}

export default Note;
