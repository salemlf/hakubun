import { IonCol, IonRow } from "@ionic/react";
import styled from "styled-components";

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

export const SubjInfoContainer = styled.div`
  background-color: var(--foreground-color);
  border-radius: 25px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
  padding-top: 20px;
  margin: 16px;
  margin-top: 0;
`;

// TODO: probably have to alter to account for desktop size
export const SubjSummaryRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const SubjSummaryCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SubjDetailSubHeading = styled.h3`
  font-size: 1.25rem;
  margin: 4px 0 4px;
`;

export const SubjDetailTxt = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

export const SubjDetailSection = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const ReadingsStyle = styled.div`
  padding: 0;
  display: flex;
  gap: 8px;
  align-items: baseline;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  font-family: var(--japanese-with-english-fallback-font-family);

  strong {
    font-family: var(--ion-default-font);
  }
`;

export const JapaneseTxtInline = styled.span`
  font-family: var(--japanese-font-family);
`;

export const ReadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

// TODO: change to calculate height using some other method
export const SubjDetailTabContainer = styled.div`
  margin: 0;
  margin-top: 16px;
  background-color: var(--light-greyish-purple);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 25px;
  max-height: 75%;
  overflow-y: auto;
`;
