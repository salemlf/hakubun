import { Fragment, useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { displayToast } from "../Toast/Toast.service";
import { generateUUID } from "../../utils";
import { useStudyMaterialsBySubjID } from "../../hooks/study-materials/useStudyMaterialsBySubjID";
import { useStudyMaterialsChange } from "../../hooks/study-materials/useStudyMaterialsChange";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/StudyMaterial";
import AlertModal from "../AlertModal";
import Button from "../Button";
import styled from "styled-components";

const UserMeaningChip = styled(Button)`
  background-color: var(--light-grey);
  padding: 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }

  ion-icon {
    margin-left: 5px;
    width: 1.25em;
    height: 1.25em;
  }
`;

type MeaningWithUUID = {
  meaning: string;
  uuid: string;
};

type ChipProps = {
  subject: Subject;
  studyMaterialsResponse: StudyMaterialDataResponse;
  userMeaningsWithUUIDs: MeaningWithUUID[];
};

const Chips = ({
  subject,
  studyMaterialsResponse,
  userMeaningsWithUUIDs,
}: ChipProps) => {
  const { deleteUserAltSubjectMeaning } = useStudyMaterialsChange();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeaning, setSelectedMeaning] = useState<
    MeaningWithUUID | undefined
  >();

  const onUserMeaningChipPress = (meaningWithUUID: MeaningWithUUID) => {
    setSelectedMeaning(meaningWithUUID);
    setIsModalOpen(true);
  };

  const deleteMeaning = (meaningWithUUID: MeaningWithUUID | undefined) => {
    setIsModalOpen(false);
    if (meaningWithUUID === undefined) {
      displayToast({
        toastType: "error",
        title: `Error Deleting User Meaning`,
        content: `Huh, it looks like the user meaning "${selectedMeaning?.meaning}" doesn't exist? Strange...`,
        timeout: 10000,
      });
      return;
    }
    const meaningToDelete = meaningWithUUID.meaning;
    deleteUserAltSubjectMeaning(
      subject,
      studyMaterialsResponse,
      meaningToDelete
    );

    displayToast({
      toastType: "success",
      title: `Deleted User Meaning`,
      content: `Successfully deleted user meaning "${selectedMeaning?.meaning}"`,
      timeout: 10000,
    });

    setSelectedMeaning(undefined);
  };

  const onCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedMeaning(undefined);
    displayToast({
      toastType: "warning",
      title: `Cancelled Deletion`,
      content: `Cancelled deleting user meaning "${selectedMeaning?.meaning}"`,
      timeout: 10000,
    });
  };

  return (
    <>
      {userMeaningsWithUUIDs.map((meaningWithUUID: MeaningWithUUID) => {
        return (
          <Fragment key={meaningWithUUID.uuid}>
            <UserMeaningChip
              onPress={() => {
                onUserMeaningChipPress(meaningWithUUID);
              }}
            >
              {meaningWithUUID.meaning}
              <IonIcon icon={closeCircle}></IonIcon>
            </UserMeaningChip>
          </Fragment>
        );
      })}
      <AlertModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertModal.Content
          modalID="delete-meaning-chip-alert-modal"
          isOpen={isModalOpen}
          title="Delete Meaning"
          confirmText="Delete"
          description={`Delete user meaning "${selectedMeaning?.meaning}"?`}
          cancelText="Cancel"
          onConfirmClick={() => deleteMeaning(selectedMeaning)}
          onCancelClick={onCancelDelete}
        />
      </AlertModal>
    </>
  );
};

type Props = {
  subject: Subject;
};

function UserMeaningChips({ subject }: Props) {
  const { isLoading: studyMaterialLoading, data: studyMaterialData } =
    useStudyMaterialsBySubjID(subject.id);

  const createUserMeaningKeys = (
    studyMaterialsResponse: StudyMaterialDataResponse
  ) => {
    return studyMaterialsResponse.meaning_synonyms.map((meaning) => ({
      meaning,
      uuid: generateUUID(),
    }));
  };

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {studyMaterialData && studyMaterialData.meaning_synonyms && (
            <Chips
              subject={subject}
              studyMaterialsResponse={studyMaterialData}
              userMeaningsWithUUIDs={createUserMeaningKeys(studyMaterialData)}
            />
          )}
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "20px" }}
        ></IonSkeletonText>
      )}
    </>
  );
}

export default UserMeaningChips;
