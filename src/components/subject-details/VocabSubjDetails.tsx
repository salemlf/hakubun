import { IonSkeletonText } from "@ionic/react";
import { Vocabulary } from "../../types/Subject";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { SubjectButtonList } from "../SubjectButtonList";
import { Hint } from "./Hint";
import { ContextSentences } from "../ContextSentences";

import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";

type KanjiUsedProps = {
  kanjiIDs: number[];
};

const KanjiUsed = ({ kanjiIDs }: KanjiUsedProps) => {
  const {
    isLoading: kanjiUsedSubjLoading,
    data: kanjiUsedSubjData,
    error: kanjiUsedSubjErr,
  } = useSubjectsByIDs(kanjiIDs);

  const {
    isLoading: kanjiUsedAssignmentsLoading,
    data: kanjiUsedAssignmentsData,
    error: kanjiUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanjiIDs);

  let loading =
    kanjiUsedSubjLoading ||
    kanjiUsedSubjErr ||
    kanjiUsedAssignmentsLoading ||
    kanjiUsedAssignmentsErr;

  if (loading) {
    return (
      <div className="ion-padding">
        <IonSkeletonText animated={true}></IonSkeletonText>
        <IonSkeletonText animated={true}></IonSkeletonText>
      </div>
    );
  }

  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Kanji Used</SubjDetailSubHeading>
      <SubjectButtonList
        subjList={kanjiUsedSubjData}
        assignmentList={kanjiUsedAssignmentsData}
      />
    </SubjDetailSection>
  );
};

type Props = {
  vocab: Vocabulary;
};

// TODO: create a version of this for kana vocab
export const VocabSubjDetails = ({ vocab }: Props) => {
  let findComponents =
    vocab.component_subject_ids && vocab.component_subject_ids.length !== 0;

  return (
    <SubjInfoContainer>
      <ContextSentences sentences={vocab.context_sentences} />
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Explanation</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={vocab.meaning_mnemonic} />
        {vocab.reading_hint && <Hint hint={vocab.reading_hint} />}
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Explanation</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={vocab.reading_mnemonic!} />
        {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      </SubjDetailSection>
      {findComponents && <KanjiUsed kanjiIDs={vocab.component_subject_ids!} />}
    </SubjInfoContainer>
  );
};
