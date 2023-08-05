import { IonAlert, IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import styled from "styled-components/macro";
import Button from "../components/Button/Button";

export const FullWidthGrid = styled(IonGrid)`
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
`;

type RowProps = {
  justify: string;
};

export const SubjRow = styled(IonRow)<RowProps>`
  align-items: center;
  justify-content: ${({ justify }) => justify};
  margin-left: -3px;
`;

export const SubjCol = styled(IonCol)`
  flex-grow: 0;
  flex-shrink: 0;
`;

export const NoteHintContainer = styled.div`
  background-color: var(--light-grey);
  border-radius: 15px;
  padding: 8px;
  margin: 10px 0;

  font-size: 0.9rem;
  line-height: 1.5;
`;

export const NoteHintHeading = styled.h6`
  margin: 3px 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const IconHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  ion-icon {
    width: 1.5em;
    height: 1.5em;
    margin-right: 5px;
  }
`;

// TODO: modify so can see textbox before click (has an outline)
export const Alert = styled(IonAlert)`
  @media (prefers-color-scheme: dark) {
    .alert-message {
      color: white;
    }
  }
`;

export const Chip = styled(Button)`
  padding: 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }

  ion-icon {
    margin-left: 5px;
    width: 1.25em;
    height: 1.25em;
  }
`;

export const BottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
`;

// TODO: change to use plain html styled div instead of IonRow
export const BottomSheetContent = styled(IonRow)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
  border-radius: 25px;
  margin: 0;

  display: flex;
  justify-content: flex-start;
  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
`;

export const ContentWithTabBar = styled(IonContent)`
  --padding-start: var(--ion-padding, 0px);
  --padding-end: var(--ion-padding, 5px);
  --padding-top: var(--ion-padding, 5px);
  --padding-bottom: 4rem;
  padding-inline-start: var(--ion-padding, 5px);
  padding-inline-end: var(--ion-padding, 5px);
  padding-top: var(--ion-padding, 5px);
  padding-bottom: 4rem;
`;
