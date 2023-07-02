import { IonSkeletonText } from "@ionic/react";
import { Vocabulary } from "../../types/Subject";
import { SubjInfoContainer } from "./SubjectDetailsStyled";
import { ContextSentences } from "../ContextSentences";
import { KanjiUsedInVocab } from "../subjects/KanjiUsedInVocab";
import { VocabMeaningExplanation } from "../subjects/VocabMeaningExplanation";
import { VocabReadingExplanation } from "../subjects/VocabReadingExplanation";

type Props = {
  vocab: Vocabulary;
};

// TODO: create a version of this for kana vocab
export const VocabSubjDetails = ({ vocab }: Props) => {
  let findComponents =
    vocab.component_subject_ids && vocab.component_subject_ids.length !== 0;

  return (
    <SubjInfoContainer>
      <VocabMeaningExplanation vocab={vocab} />
      <VocabReadingExplanation vocab={vocab} />
      <ContextSentences sentences={vocab.context_sentences} />
      {findComponents && (
        <KanjiUsedInVocab kanjiIDs={vocab.component_subject_ids!} />
      )}
    </SubjInfoContainer>
  );
};
