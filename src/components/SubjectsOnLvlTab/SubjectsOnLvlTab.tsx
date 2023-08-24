import { useSubjectsByLevel } from "../../hooks/useSubjectsByLevel";
import { Subject } from "../../types/Subject";
import SubjectButton from "../SubjectButton";
import Card from "../Card";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SubjectWideBtnList from "../SubjectWideBtnList";

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
              {(radicals as Subject[]).map((radical: Subject) => {
                return (
                  <SubjectButton
                    key={`col_${radical.id}`}
                    subject={radical}
                    assignment={undefined}
                    locked={true}
                    useLockedStyle={false}
                    showDetails={false}
                    isButtonLink={true}
                  />
                );
              })}
            </SubjectCardContainer>
          </Card>
          <Card title={`Kanji - ${kanji.length}`}>
            <SubjectCardContainer>
              {(kanji as Subject[]).map((kanjiItem: Subject) => {
                return (
                  <SubjectButton
                    key={`col_${kanjiItem.id}`}
                    subject={kanjiItem}
                    assignment={undefined}
                    locked={true}
                    isButtonLink={true}
                    useLockedStyle={false}
                    showDetails={false}
                  />
                );
              })}
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
