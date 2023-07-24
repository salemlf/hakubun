import { useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import { capitalizeWord } from "../../services/MiscService";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse, UserNoteType } from "../../types/MiscTypes";
import Note from "./Note";

import styled from "styled-components/macro";
import { Chip } from "../../styles/BaseStyledComponents";
import { addOutline } from "ionicons/icons";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 8px;
`;

const AddButton = styled(Chip)`
  background-color: var(--ion-color-secondary);
  font-size: 0.9rem;
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
  isRadical?: boolean;
};

function UserNote({ subject, noteType, isRadical = false }: Props) {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const [editingInProgress, setEditingInProgress] = useState(false);

  let studyMaterialPropKey: NoteKey =
    noteType === "meaning" ? "meaning_note" : "reading_note";

  let addButtonTxt = !isRadical
    ? `Add ${capitalizeWord(noteType)} Note`
    : `Add Note`;

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
              isRadical={isRadical}
            />
          ) : (
            <AddButtonContainer>
              <AddButton
                onClick={(e: any) => {
                  setEditingInProgress(true);
                }}
              >
                {addButtonTxt}
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
}

export default UserNote;
