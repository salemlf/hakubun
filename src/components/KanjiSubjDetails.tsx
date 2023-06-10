import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Kanji } from "../types/Subject";
import { TxtWithSubjTags } from "./TxtWithSubjTags";
import { SubjectCardList } from "./SubjectCardList";
import { Hint } from "./Hint";
import {
  SubjInfoContainer,
  SubjDetailSubHeading,
  SubjDetailTxt,
  SubjDetailSection,
} from "./SubjectDetailsStyled";

import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../hooks/useAssignmentsBySubjIDs";

type Props = {
  kanji: Kanji;
};

export const KanjiSubjDetails = ({ kanji }: Props) => {
  let findComponents = kanji.component_subject_ids.length !== 0;
  let findSimilar = kanji.visually_similar_subject_ids.length !== 0;

  const {
    isLoading: radicalsUsedSubjLoading,
    data: radicalsUsedSubjData,
    error: radicalsUsedSubjErr,
  } = useSubjectsByIDs(kanji.component_subject_ids, findComponents);

  const {
    isLoading: radicalsUsedAssignmentsLoading,
    data: radicalsUsedAssignmentsData,
    error: radicalsUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.component_subject_ids, findComponents);

  const {
    isLoading: similarKanjiSubjLoading,
    data: similarKanjiSubjData,
    error: similarKanjiSubjErr,
  } = useSubjectsByIDs(kanji.visually_similar_subject_ids, findSimilar);

  const {
    isLoading: similarKanjiAssignmentsLoading,
    data: similarKanjiAssignmentsData,
    error: similarKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.visually_similar_subject_ids, findSimilar);

  let simliarLoading =
    findSimilar &&
    (similarKanjiAssignmentsLoading ||
      similarKanjiAssignmentsErr ||
      similarKanjiSubjLoading ||
      similarKanjiSubjErr);

  let componentsLoading =
    findComponents &&
    (radicalsUsedSubjLoading ||
      radicalsUsedSubjErr ||
      radicalsUsedAssignmentsLoading ||
      radicalsUsedAssignmentsErr);

  let radicalsUsedLoading = simliarLoading || componentsLoading;

  // TODO: make this laoding skeleton actually good lol
  if (radicalsUsedLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <SubjDetailSection>
        <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
        <SubjectCardList
          subjList={radicalsUsedSubjData}
          assignmentList={radicalsUsedAssignmentsData}
        />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={kanji.meaning_mnemonic} />
        {kanji.reading_hint && <Hint hint={kanji.reading_hint} />}
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={kanji.reading_mnemonic!} />
        {kanji.meaning_hint && <Hint hint={kanji.meaning_hint} />}
      </SubjDetailSection>
      {findSimilar && (
        <SubjDetailSection>
          <SubjDetailSubHeading>Visually Similar Kanji</SubjDetailSubHeading>
          <SubjectCardList
            subjList={similarKanjiSubjData}
            assignmentList={similarKanjiAssignmentsData}
          />
        </SubjDetailSection>
      )}
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Vocabulary</SubjDetailSubHeading>
        <SubjDetailTxt>...</SubjDetailTxt>
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
