import { useEffect, useState } from "react";
import { useSubjectsByLevel } from "../../hooks/useSubjectsByLevel";
import { Subject } from "../../types/Subject";
import Card from "../Card";
import SubjectButtonList from "../SubjectButtonList";
import SubjectWideBtnList from "../SubjectWideBtnList";
import LoadingDots from "../LoadingDots";
import { LoadingContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SubjectCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 5px;
`;

type Props = {
  level: number;
  isSelected: boolean;
};

function SubjectsOnLvlTab({ level, isSelected }: Props) {
  const [radicals, setRadicals] = useState<Subject[]>([]);
  const [kanji, setKanji] = useState<Subject[]>([]);
  const [vocabulary, setVocabulary] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    isLoading: subjectCurrLvlLoading,
    data: subjectCurrLvlData,
    error: subjectCurrLvlErr,
  } = useSubjectsByLevel(level);

  // *testing
  console.log(
    "🚀 ~ file: SubjectsOnLvlTab.tsx:38 ~ SubjectsOnLvlTab ~ isSelected:",
    isSelected
  );
  console.log(
    "🚀 ~ file: SubjectsOnLvlTab.tsx:38 ~ SubjectsOnLvlTab ~ subjectCurrLvlData:",
    subjectCurrLvlData
  );
  console.log(
    "🚀 ~ file: SubjectsOnLvlTab.tsx:38 ~ SubjectsOnLvlTab ~ subjectCurrLvlLoading:",
    subjectCurrLvlLoading
  );
  // *testing

  useEffect(() => {
    if (!subjectCurrLvlLoading && subjectCurrLvlData) {
      // removing any radicals without amalgamation_subject_ids, (AKA not actually used in kanji)
      setRadicals(
        subjectCurrLvlData.filter(
          (subject: Subject) =>
            subject.object === "radical" &&
            subject.amalgamation_subject_ids &&
            subject.amalgamation_subject_ids.length !== 0
        )
      );
      setKanji(
        subjectCurrLvlData.filter(
          (subject: Subject) => subject.object === "kanji"
        )
      );
      setVocabulary(
        subjectCurrLvlData.filter(
          (subject: Subject) =>
            subject.object === "vocabulary" ||
            subject.object === "kana_vocabulary"
        )
      );
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [subjectCurrLvlLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <LoadingDots />
        </LoadingContainer>
      ) : (
        <>
          <Card
            title={`Radicals - ${radicals.length}`}
            headerBgColor="var(--wanikani-radical)"
            headerTextColor="white"
          >
            <SubjectCardContainer>
              <SubjectButtonList
                subjList={radicals}
                assignmentList={[]}
                btnSize="md"
              />
            </SubjectCardContainer>
          </Card>
          <Card
            title={`Kanji - ${kanji.length}`}
            headerBgColor="var(--wanikani-kanji)"
            headerTextColor="white"
          >
            <SubjectCardContainer>
              <SubjectButtonList
                subjList={kanji}
                assignmentList={[]}
                btnSize="md"
              />
            </SubjectCardContainer>
          </Card>
          <Card
            title={`Vocabulary - ${vocabulary.length}`}
            headerBgColor="var(--wanikani-vocab)"
            headerTextColor="white"
            margin="16px 16px 60px 16px"
          >
            <SubjectCardContainer>
              <SubjectWideBtnList subjList={vocabulary} />
            </SubjectCardContainer>
          </Card>
        </>
      )}
    </>
  );
}

export default SubjectsOnLvlTab;
