import { IonSkeletonText } from "@ionic/react";
import { Vocabulary } from "../../types/Subject";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Hint } from "./Hint";
import { ContextSentences } from "../ContextSentences";
import { KanjiUsedInVocab } from "../subjects/KanjiUsedInVocab";
import { VocabMeaningExplanation } from "../subjects/VocabMeaningExplanation";

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
      <VocabMeaningExplanation vocab={vocab} />
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Explanation</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={vocab.reading_mnemonic!} />
        {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      </SubjDetailSection>
      {findComponents && (
        <KanjiUsedInVocab kanjiIDs={vocab.component_subject_ids!} />
      )}
    </SubjInfoContainer>
  );
};
