import { IonCol, IonRow } from "@ionic/react";
import styled from "styled-components/macro";

// TODO: move this file to a more general location
type RowColProps = {
  className?: string;
  children: React.ReactNode;
};

export const Row = ({ className, children }: RowColProps) => (
  <IonRow className={className}>{children}</IonRow>
);

export const Col = ({ className, children }: RowColProps) => (
  <IonCol className={className}>{children}</IonCol>
);

export const SubjInfoContainer = styled(IonRow)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
  border-radius: 25px;
  margin: 10px;

  display: flex;
  justify-content: flex-start;
  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
`;

// TODO: probably have to alter to account for desktop size
export const SubjSummaryRow = styled(Row)`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const SubjSummaryCol = styled(Col)`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SubjDetailSubHeading = styled.h3`
  font-size: 1.25rem;
  margin: 8px 0;
`;

export const SubjDetailTxt = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

export const SubjDetailSection = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const ReadingsStyle = styled(IonCol)`
  padding: 3px 0;
`;

export const ReadingContainer = styled(IonCol)`
  display: flex;
  flex-direction: column;
  padding-left: 0;
`;
