import { IonIcon, IonRow, IonSkeletonText } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/assignments/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Radical } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import RadicalNameMnemonic from "../RadicalNameMnemonic/RadicalNameMnemonic";
import Emoji from "../Emoji";
import MagnifyingGlassIcon from "../../images/magnifying-glass-color.svg";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import { FoundInHeadingContainer } from "../../styles/BaseStyledComponents";

type Props = {
  radical: Radical;
};

function RadicalSubjDetails({ radical }: Props) {
  const hasAmalgamationSubjs = radical.amalgamation_subject_ids.length > 0;
  const {
    isLoading: usedInKanjiSubjLoading,
    data: usedInKanjiSubjData,
    error: usedInKanjiSubjErr,
  } = useSubjectsByIDs(
    radical.amalgamation_subject_ids,
    hasAmalgamationSubjs,
    true
  );

  const {
    isLoading: usedInKanjiAssignmentsLoading,
    data: usedInKanjiAssignmentsData,
    error: usedInKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(
    radical.amalgamation_subject_ids,
    hasAmalgamationSubjs
  );

  let usedInKanjiLoading =
    hasAmalgamationSubjs &&
    (usedInKanjiSubjLoading ||
      usedInKanjiSubjErr ||
      usedInKanjiAssignmentsLoading ||
      usedInKanjiAssignmentsErr);

  // TODO: improve loading skeleton
  if (usedInKanjiLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <RadicalNameMnemonic radical={radical} />
      <SubjDetailSection>
        <FoundInHeadingContainer>
          <IonIcon src={MagnifyingGlassIcon} />
          <SubjDetailSubHeading>Found in Kanji</SubjDetailSubHeading>
        </FoundInHeadingContainer>
        {hasAmalgamationSubjs ? (
          <SubjectButtonList
            btnSize="lg"
            subjList={usedInKanjiSubjData}
            assignmentList={usedInKanjiAssignmentsData}
          />
        ) : (
          <p>
            Woah, you found one of the lonely radicals that have no related
            kanji! A bit of an easter egg{" "}
            <Emoji symbol="🥚" label="egg (pretend it's an easter egg)" />
          </p>
        )}
      </SubjDetailSection>
    </SubjInfoContainer>
  );
}

export default RadicalSubjDetails;
