import { IonCol, IonSkeletonText } from "@ionic/react";
import styled from "styled-components/macro";

const BtnSkeletonTxt = styled(IonSkeletonText)`
  width: 100%;
  margin: 0;
  height: 3.75rem;
`;

function SrsStagesLoadingSkeleton() {
  return (
    <>
      <IonCol size-xs="6" size-md="3">
        <BtnSkeletonTxt animated={true}></BtnSkeletonTxt>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <BtnSkeletonTxt animated={true}></BtnSkeletonTxt>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <BtnSkeletonTxt animated={true}></BtnSkeletonTxt>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <BtnSkeletonTxt animated={true}></BtnSkeletonTxt>
      </IonCol>
      <IonCol size-xs="12" size-md="6">
        <BtnSkeletonTxt animated={true}></BtnSkeletonTxt>
      </IonCol>
    </>
  );
}

export default SrsStagesLoadingSkeleton;
