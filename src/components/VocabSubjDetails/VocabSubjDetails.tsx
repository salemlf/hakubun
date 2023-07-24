import { Vocabulary } from "../../types/Subject";
import ContextSentences from "../ContextSentences/ContextSentences";
import KanjiUsedInVocab from "../KanjiUsedInVocab/KanjiUsedInVocab";
import VocabMeaningExplanation from "../VocabMeaningExplanation/VocabMeaningExplanation";
import VocabReadingExplanation from "../VocabReadingExplanation/VocabReadingExplanation";
import { SubjInfoContainer } from "../../styles/SubjectDetailsStyled";

type Props = {
  vocab: Vocabulary;
};

// TODO: create a version of this for kana vocab
function VocabSubjDetails({ vocab }: Props) {
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
}

export default VocabSubjDetails;
