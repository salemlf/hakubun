import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { BasicCard } from "../components/cards/BasicCard";
import { Assignment, assignmentBatchSizes } from "../types/Assignment";
import { SubjectType } from "../types/Subject";
import { getSubjectColor } from "../services/SubjectAndAssignmentService";

import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

const HeaderContainer = styled(IonHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--wanikani-review);

  padding: 10px 0;
  box-shadow: none;
`;

const Row = styled(IonRow)`
  display: flex;
  align-items: center;

  padding-top: var(--ion-padding, 5px);
  padding-bottom: var(--ion-padding, 5px);
`;

const Title = styled.h1`
  text-align: center;
`;

const SubjectTypeFieldset = styled.fieldset`
  border: none;
  padding-left: 12px;
  display: flex;
  gap: 10px;
`;

const SubjectTypeLegend = styled.legend`
  font-size: 1rem;
  color: white;
`;

type AssignTypeOptionProps = {
  assignType: SubjectType;
};

// TODO: make this prettier
// TODO: select all items by default
// TODO: hide/disable if subject type not available
const AssignTypeOption = styled.label<AssignTypeOptionProps>`
  color: white;
  border-radius: 10px;
  padding: 3px 6px;
  background-color: ${({ assignType }) => getSubjectColor(assignType)};

  input {
    margin-left: 5px;
  }
`;

type SettingProps = {
  availForReview: Assignment[];
};

const SettingOptions = ({ availForReview }: SettingProps) => {
  // *testing
  console.log(
    "🚀 ~ file: Reviews.tsx:56 ~ Settings ~ availForReview:",
    availForReview
  );
  // *testing
  let availBatchSizes = assignmentBatchSizes.filter(
    (batchSize) => batchSize <= availForReview.length
  );
  // TODO: select default num for batch

  return (
    <>
      <IonList>
        <IonItem>
          <IonSelect aria-label="batch-size" label="Batch Size">
            {availBatchSizes.map((batchSize: number) => {
              return (
                <IonSelectOption key={`batch_${batchSize}`} value={batchSize}>
                  {batchSize}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
      </IonList>
      <SubjectTypeFieldset>
        <SubjectTypeLegend>Subject Types</SubjectTypeLegend>
        <AssignTypeOption htmlFor="radicals" assignType="radical">
          Radicals
          <input
            type="checkbox"
            name="radicals"
            value="radicals"
            id="radicals"
          />
        </AssignTypeOption>
        <AssignTypeOption htmlFor="kanji" assignType="kanji">
          Kanji
          <input type="checkbox" name="kanji" value="kanji" id="kanji" />
        </AssignTypeOption>
        <AssignTypeOption htmlFor="vocabulary" assignType="vocabulary">
          Vocabulary
          <input
            id="vocabulary"
            type="checkbox"
            name="vocabulary"
            value="vocabulary"
          />
        </AssignTypeOption>
      </SubjectTypeFieldset>
    </>
  );
};

// TODO: hide tab bar on this page
// TODO: add button to start review
export const Reviews = () => {
  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  return (
    <Page>
      <HeaderContainer>
        <Row>
          <Title>Review</Title>
        </Row>
      </HeaderContainer>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              {availForReviewLoading && (
                <BasicCard isLoading={true}></BasicCard>
              )}
              {!availForReviewLoading && availForReviewErr && (
                <div>{`Error: ${availForReviewErr}`}</div>
              )}
              {!availForReviewLoading &&
                !availForReviewErr &&
                availForReviewData && (
                  <BasicCard isLoading={false}>
                    <SettingOptions availForReview={availForReviewData} />
                  </BasicCard>
                )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
