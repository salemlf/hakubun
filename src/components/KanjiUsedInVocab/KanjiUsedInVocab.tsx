import { useEffect, useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Subject } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import PuzzleIcon from "../../images/puzzle.svg";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";

type Props = {
  kanjiIDs: number[];
  displayQuestionTxt?: boolean;
  vocabSlug: string;
};

function KanjiUsedInVocab({
  kanjiIDs,
  displayQuestionTxt = false,
  vocabSlug,
}: Props) {
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

  const [kanjiUsedSubjects, setKanjiUsedSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !kanjiUsedAssignmentsLoading &&
      !kanjiUsedSubjLoading &&
      kanjiUsedSubjData &&
      kanjiUsedAssignmentsData
    ) {
      const sortedSubjData = [...kanjiUsedSubjData].sort((a, b) => {
        const aIndex = vocabSlug.indexOf(a.slug);
        const bIndex = vocabSlug.indexOf(b.slug);
        return aIndex - bIndex;
      });

      setKanjiUsedSubjects(sortedSubjData);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [kanjiUsedAssignmentsLoading, kanjiUsedSubjLoading]);

  if (isLoading) {
    return (
      <div className="ion-padding">
        <IonSkeletonText animated={true}></IonSkeletonText>
        <IonSkeletonText animated={true}></IonSkeletonText>
      </div>
    );
  }

  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={PuzzleIcon} />
        <SubjDetailSubHeading>Kanji Used</SubjDetailSubHeading>
      </IconHeadingContainer>
      <SubjectButtonList
        btnSize="lg"
        subjList={kanjiUsedSubjects}
        assignmentList={kanjiUsedAssignmentsData ?? []}
      />
      {displayQuestionTxt && (
        <>
          <p>
            Does the combination of kanji meanings somewhat fit the vocabulary
            meaning?
          </p>
          <p>
            Based on the kanji composition, can you guess the reading of the
            vocabulary?
          </p>
        </>
      )}
    </SubjDetailSection>
  );
}

export default KanjiUsedInVocab;
