import { useEffect, useRef, useState } from "react";
import { IonIcon, IonLabel, IonSkeletonText } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import TrashIcon from "../../images/trash.svg";
import SaveIcon from "../../images/save.svg";
import CancelIcon from "../../images/cancel.svg";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";

import {
  NoteHintContainer,
  NoteHintHeading,
  IconHeadingContainer,
  Alert,
  AddChip,
} from "../styles/BaseStyledComponents";
import styled from "styled-components/macro";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";

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

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 3px;
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

type NoteProps = {
  meaningNote: string;
  beganEditing: boolean;
  setEditingInProgress: (isEditing: boolean) => void;
};

// TODO: on trash button click -> confirm note deletion
// TODO: update meaning note value in API
const Note = ({
  meaningNote,
  setEditingInProgress,
  beganEditing,
}: NoteProps) => {
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
    let val = evt.target?.value;

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

type Props = {
  subject: Subject;
};

export const UserMeaningNote = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const [editingInProgress, setEditingInProgress] = useState(false);

  // *testing
  console.log(
    "🚀 ~ file: UserMeaningNote.tsx:178 ~ UserMeaningNote ~ studyMaterialData:",
    studyMaterialData
  );
  // *testing

  const meaningNoteNotEmpty = (
    studyMaterialData: StudyMaterialDataResponse
  ) => {
    return (
      studyMaterialData &&
      !Array.isArray(studyMaterialData) &&
      studyMaterialData.meaning_note !== null &&
      studyMaterialData.meaning_note !== ""
    );
  };

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {meaningNoteNotEmpty(studyMaterialData) || editingInProgress ? (
            <Note
              meaningNote={studyMaterialData.meaning_note}
              beganEditing={editingInProgress}
              setEditingInProgress={(isEditing: boolean) =>
                setEditingInProgress(isEditing)
              }
            />
          ) : (
            <AddButtonContainer>
              <AddChip
                tabIndex={0}
                id="present-user-meaning-note-add"
                onClick={(e: any) => {
                  console.log("ADD USER MEANING CLICKED! ");
                  setEditingInProgress(true);
                }}
              >
                <IonLabel>Add Meaning Note</IonLabel>
                <IonIcon icon={addOutline}></IonIcon>
              </AddChip>
            </AddButtonContainer>
          )}
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "30px" }}
        ></IonSkeletonText>
      )}
    </>
  );
};
