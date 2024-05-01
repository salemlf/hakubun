import { useState } from "react";
import { IonSkeletonText } from "@ionic/react";
import { useStudyMaterialsBySubjID } from "../../hooks/study-materials/useStudyMaterialsBySubjID";
import { useStudyMaterialsChange } from "../../hooks/study-materials/useStudyMaterialsChange";
import { Subject } from "../../types/Subject";
import { UserNoteType } from "../../types/MiscTypes";
import { StudyMaterialDataResponse } from "../../types/StudyMaterial";
import DeleteNoteModal from "./DeleteNoteModal";
import EditNoteModal from "./EditNoteModal";
import Button from "../Button";
import SvgIcon from "../SvgIcon";
import NoteIcon from "../../images/note.svg?react";
import PencilIcon from "../../images/pencil.svg?react";
import TrashIcon from "../../images/trash.svg?react";
import {
  IconHeadingContainer,
  NoteHintContainer,
  NoteHintHeading,
} from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const EditingButton = styled(Button)`
  padding: 7px;
  border-radius: 50%;
`;

const NoteContainer = styled(NoteHintContainer)`
  position: relative;
  padding-bottom: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 5px;
  bottom: -20px;
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

const NoteContents = styled.div`
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

  ::-moz-selection {
    background-color: var(--ion-color-primary);
    color: black;
  }
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

export type Props = {
  subject: Subject;
  noteType: UserNoteType;
  isRadical?: boolean;
};

function UserNote({ subject, noteType, isRadical = false }: Props) {
  const { isLoading: studyMaterialLoading, data: studyMaterialData } =
    useStudyMaterialsBySubjID(subject.id);
  const {
    addMeaningNote,
    removeMeaningNote,
    addReadingNote,
    removeReadingNote,
  } = useStudyMaterialsChange();

  const [isDelNoteModalOpen, setIsDelNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);

  const studyMaterialPropKey: NoteKey =
    noteType === "meaning" ? "meaning_note" : "reading_note";
  const userNoteContent =
    studyMaterialData?.[studyMaterialPropKey] ?? undefined;
  const userNoteHasContent = userNoteNotEmpty(
    studyMaterialData,
    studyMaterialPropKey
  );

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {userNoteHasContent && (
            <>
              <NoteContainer>
                <IconHeadingContainer>
                  <SvgIcon icon={<NoteIcon />} width="1.75em" height="1.75em" />
                  <NoteHintHeading>
                    {isRadical ? "Note" : `${noteType} Note`}
                  </NoteHintHeading>
                </IconHeadingContainer>
                <NoteContents>{userNoteContent ?? ""}</NoteContents>
                <ButtonContainer>
                  <>
                    <TrashButton
                      aria-label={
                        isRadical ? "Delete Note" : `Delete ${noteType} Note`
                      }
                      onPress={() => setIsDelNoteModalOpen(true)}
                    >
                      <SvgIcon
                        icon={<TrashIcon />}
                        width="1.75em"
                        height="1.75em"
                      />
                    </TrashButton>
                    <PencilButton
                      onPress={() => setIsEditNoteModalOpen(true)}
                      aria-label={
                        isRadical ? "Edit Note" : `Edit ${noteType} Note`
                      }
                    >
                      <SvgIcon
                        icon={<PencilIcon />}
                        width="1.75em"
                        height="1.75em"
                      />
                    </PencilButton>
                  </>
                </ButtonContainer>
              </NoteContainer>
              <DeleteNoteModal
                isOpen={isDelNoteModalOpen}
                setIsOpen={setIsDelNoteModalOpen}
                isRadical={isRadical}
                noteType={noteType}
                deleteMeaningNoteCallback={() =>
                  removeMeaningNote(subject, studyMaterialData)
                }
                deleteReadingNoteCallback={() =>
                  removeReadingNote(subject, studyMaterialData)
                }
              />
            </>
          )}
          <EditNoteModal
            isOpen={isEditNoteModalOpen}
            setIsOpen={setIsEditNoteModalOpen}
            isAddBtnVisible={!userNoteHasContent}
            isRadical={isRadical}
            noteType={noteType}
            userNoteContent={userNoteContent}
            addMeaningNoteCallback={(userNoteContent: string) =>
              addMeaningNote(subject, studyMaterialData, userNoteContent)
            }
            addReadingNoteCallback={(userNoteContent: string) =>
              addReadingNote(subject, studyMaterialData, userNoteContent)
            }
          />
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
