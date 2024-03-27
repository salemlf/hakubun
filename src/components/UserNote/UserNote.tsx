import { useState } from "react";
import { IonSkeletonText } from "@ionic/react";
import { capitalizeWord } from "../../services/MiscService/MiscService";
import { useStudyMaterialsBySubjID } from "../../hooks/study-materials/useStudyMaterialsBySubjID";
import { Subject } from "../../types/Subject";
import { UserNoteType } from "../../types/MiscTypes";
import { StudyMaterialDataResponse } from "../../types/StudyMaterial";
import Note from "./Note";
import { Chip } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

const AddButton = styled(Chip)`
  background-color: var(--ion-color-secondary);
  font-size: 0.9rem;
  border: 2px solid black;
`;

const PlusSign = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  padding-left: 5px;
`;

type NoteKey = "meaning_note" | "reading_note";

const userNoteNotEmpty = (
  studyMaterialData: StudyMaterialDataResponse | undefined,
  noteKey: NoteKey
): boolean => {
  return (
    studyMaterialData !== undefined &&
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
  const { isLoading: studyMaterialLoading, data: studyMaterialData } =
    useStudyMaterialsBySubjID(subject.id);

  const [editingInProgress, setEditingInProgress] = useState(false);

  const studyMaterialPropKey: NoteKey =
    noteType === "meaning" ? "meaning_note" : "reading_note";

  const addButtonTxt = !isRadical
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
              noteContent={
                studyMaterialData
                  ? studyMaterialData[studyMaterialPropKey]
                  : null
              }
              beganEditing={editingInProgress}
              setEditingInProgress={(isEditing: boolean) =>
                setEditingInProgress(isEditing)
              }
              isRadical={isRadical}
            />
          ) : (
            <AddButtonContainer>
              <AddButton
                aria-label={`Add ${noteType} note`}
                onPress={() => {
                  setEditingInProgress(true);
                }}
              >
                {addButtonTxt}
                <PlusSign>+</PlusSign>
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
