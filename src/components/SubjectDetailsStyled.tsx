import { IonRow } from "@ionic/react";
import styled from "styled-components";

type RowProps = {
  className?: string;
  children: React.ReactNode;
};

export const Row = ({ className, children }: RowProps) => (
  <IonRow className={className}>{children}</IonRow>
);

// export const Container = ({ children }: RowProps) => (
//   <IonRow className="ion-justify-content-start">{children}</IonRow>
// );

export const SubjInfoContainer = styled(IonRow)`
  display: flex;
  justify-content: start;
  --padding-start: var(--ion-padding, 16px);
  --padding-end: var(--ion-padding, 16px);
  --padding-top: var(--ion-padding, 16px);
  --padding-bottom: var(--ion-padding, 16px);
  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
`;
