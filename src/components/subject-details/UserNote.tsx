import { useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import { Note } from "./Note";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse, UserNoteType } from "../../types/MiscTypes";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";

import styled from "styled-components/macro";
import { Chip } from "../styles/BaseStyledComponents";
import { addOutline } from "ionicons/icons";
import { capitalizeWord } from "../../services/MiscService";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 3px;
`;

const AddButton = styled(Chip)`
  background-color: var(--ion-color-secondary);
`;

type NoteKey = "meaning_note" | "reading_note";

const userNoteNotEmpty = (
  studyMaterialData: StudyMaterialDataResponse,
  noteKey: NoteKey
) => {
  return (
    studyMaterialData &&
    !Array.isArray(studyMaterialData) &&
    studyMaterialData[noteKey] !== null &&
    studyMaterialData[noteKey] !== ""
  );
};

type Props = {
  subject: Subject;
  noteType: UserNoteType;
};

export const UserNote = ({ subject, noteType }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const [editingInProgress, setEditingInProgress] = useState(false);

  let studyMaterialPropKey: NoteKey =
    noteType === "meaning" ? "meaning_note" : "reading_note";
  let noteTypeCapitalized = capitalizeWord(noteType);

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {userNoteNotEmpty(studyMaterialData, studyMaterialPropKey) ||
          editingInProgress ? (
            <Note
              noteType={noteType}
              subject={subject}
              studyMaterial={studyMaterialData}
              noteContent={studyMaterialData[studyMaterialPropKey]}
              beganEditing={editingInProgress}
              setEditingInProgress={(isEditing: boolean) =>
                setEditingInProgress(isEditing)
              }
            />
          ) : (
            <AddButtonContainer>
              <AddButton
                onClick={(e: any) => {
                  setEditingInProgress(true);
                }}
              >
                Add {noteTypeCapitalized} Note
                <IonIcon icon={addOutline}></IonIcon>
              </AddButton>
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
