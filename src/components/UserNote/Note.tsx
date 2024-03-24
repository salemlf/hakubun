import { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { capitalizeWord } from "../../services/MiscService/MiscService";
import { displayToast } from "../Toast/Toast.service";
import { useStudyMaterialsChange } from "../../hooks/study-materials/useStudyMaterialsChange";
import { UserNoteType } from "../../types/MiscTypes";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/StudyMaterial";
import AlertModal from "../AlertModal";
import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import TrashIcon from "../../images/trash.svg";
import SaveIcon from "../../images/save.svg";
import CancelIcon from "../../images/cancel.svg";
import {
  NoteHintHeading,
  IconHeadingContainer,
} from "../../styles/BaseStyledComponents";
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
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

const generateNoteHeadingsAngMsg = (
  isRadical: boolean,
  noteType: UserNoteType
) => {
  const noteTypeCapitalized = capitalizeWord(noteType);

  if (isRadical) {
    return {
      noteHeadingTxt: "Note",
      alertHeadingTxt: "Delete Note",
      alertHeadingMsg:
        "Are you sure you want to delete your radical name note?",
    };
  } else {
    return {
      noteHeadingTxt: `${noteTypeCapitalized} Note`,
      alertHeadingTxt: `Delete ${noteTypeCapitalized} Note`,
      alertHeadingMsg: `Are you sure you want to delete your ${noteType} note?`,
    };
  }
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

// TODO: scroll input into view on editing start
function Note({
  subject,
  studyMaterial,
  noteContent,
  setEditingInProgress,
  beganEditing,
  noteType,
  isRadical,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    addMeaningNote,
    removeMeaningNote,
    addReadingNote,
    removeReadingNote,
  } = useStudyMaterialsChange();
  const initialTextValue = noteContent ? noteContent : "";
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

  const noteHeadingsAndMsg = generateNoteHeadingsAngMsg(isRadical, noteType);

  const handleTextAreaUpdate = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const val = evt.target ? evt.target.value : "";
    setTextValue(val);
  };

  type CompleteEditParams = {
    saveEdit: boolean;
    remove: boolean;
  };

  const completeEditing = ({ saveEdit, remove }: CompleteEditParams) => {
    setIsModalOpen(false);
    if (saveEdit) {
      if (noteType === "meaning") {
        remove
          ? removeMeaningNote(subject, studyMaterial)
          : addMeaningNote(subject, studyMaterial, textValue);
      } else {
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
    if (saveEdit && remove) {
      const noteTxt = isRadical ? "radical name" : noteType;
      displayToast({
        toastType: "success",
        title: `Deleted User Note`,
        content: `Successfully deleted your ${noteTxt} note`,
        timeout: 10000,
      });
    }
  };

  const onCancelDelete = () => {
    setIsModalOpen(false);
    const noteTxt = isRadical ? "radical name" : noteType;
    displayToast({
      toastType: "warning",
      title: `Cancelled Note Deletion`,
      content: `Cancelled deleting your ${noteTxt} note`,
      timeout: 10000,
    });
  };

  return (
    <>
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
                aria-label="Cancel note"
                onPress={() =>
                  completeEditing({ saveEdit: false, remove: false })
                }
              >
                <IonIcon src={CancelIcon} />
              </CancelButton>
              <SaveButton
                aria-label="Save note"
                onPress={() =>
                  completeEditing({ saveEdit: true, remove: false })
                }
              >
                <IonIcon src={SaveIcon} />
              </SaveButton>
            </>
          ) : (
            <>
              <TrashButton
                aria-label="Delete note"
                onPress={() => setIsModalOpen(true)}
              >
                <IonIcon src={TrashIcon} />
              </TrashButton>
              <PencilButton
                onPress={() => setIsEditable(true)}
                aria-label="Edit note"
              >
                <IonIcon src={PencilIcon} />
              </PencilButton>
            </>
          )}
        </ButtonContainer>
      </NoteContainer>
      <AlertModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertModal.Content
          isOpen={isModalOpen}
          title={noteHeadingsAndMsg.alertHeadingTxt}
          description={noteHeadingsAndMsg.alertHeadingMsg}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirmClick={() =>
            completeEditing({ saveEdit: true, remove: true })
          }
          onCancelClick={onCancelDelete}
        />
      </AlertModal>
    </>
  );
}

export default Note;
