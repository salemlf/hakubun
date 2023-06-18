import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonSkeletonText,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { BasicCard } from "../components/cards/BasicCard";

import { useReviews } from "../hooks/useReviews";
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

// TODO: limit this so max is <= number of available reviews
const batchSizes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

// TODO: hide tab bar on this page
// TODO: add button to start review
export const Reviews = () => {
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
              <BasicCard isLoading={false}>
                <IonList>
                  <IonItem>
                    <IonSelect aria-label="batch-size" label="Batch Size">
                      {batchSizes.map((batchSize: number) => {
                        return (
                          <IonSelectOption
                            key={`batch_${batchSize}`}
                            value={batchSize}
                          >
                            {batchSize}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </BasicCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
