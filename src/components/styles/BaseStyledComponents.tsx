import { IonCol, IonGrid, IonRow } from "@ionic/react";
import styled from "styled-components/macro";

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
