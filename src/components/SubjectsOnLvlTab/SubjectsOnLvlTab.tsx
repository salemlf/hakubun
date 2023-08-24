import { useEffect, useState } from "react";
import { useSubjectsByLevel } from "../../hooks/useSubjectsByLevel";
import { Subject } from "../../types/Subject";
import Card from "../Card";
import SubjectButtonList from "../SubjectButtonList";
import SubjectWideBtnList from "../SubjectWideBtnList";
import styled from "styled-components";

const SubjectCardContainer = styled.div`
  display: flex;
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
  console.log(
    "🚀 ~ file: SubjectsOnLvlTab.tsx:16 ~ SubjectsOnLvlTab ~ isSelected:",
    isSelected
  );
  const [radicals, setRadicals] = useState<Subject[]>([]);
  const [kanji, setKanji] = useState<Subject[]>([]);
  const [vocabulary, setVocabulary] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: only

  const {
    isLoading: subjectCurrLvlLoading,
    data: subjectCurrLvlData,
    error: subjectCurrLvlErr,
  } = useSubjectsByLevel(level, isSelected);

  useEffect(() => {
    if (!subjectCurrLvlLoading && subjectCurrLvlData) {
      setRadicals(
        subjectCurrLvlData.filter(
          (subject: Subject) => subject.object === "radical"
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
        <p>Loading...</p>
      ) : (
        <>
          <Card title={`Radicals - ${radicals.length}`}>
            <SubjectCardContainer>
              <SubjectButtonList subjList={radicals} assignmentList={[]} />
            </SubjectCardContainer>
          </Card>
          <Card title={`Kanji - ${kanji.length}`}>
            <SubjectCardContainer>
              <SubjectButtonList subjList={kanji} assignmentList={[]} />
            </SubjectCardContainer>
          </Card>
          <Card
            title={`Vocabulary - ${vocabulary.length}`}
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
