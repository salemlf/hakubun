import { IonSkeletonText } from "@ionic/react";
import styled from "styled-components";

type SkeletonButtonProps = {
  fullWidth: boolean;
};

const BtnSkeletonTxt = styled(IonSkeletonText)<SkeletonButtonProps>`
  width: 100%;
  height: 3.75rem;
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  border-radius: 6px;
  grid-column: ${({ fullWidth }) => fullWidth && "1 / 3"};
`;

function SrsStagesLoadingSkeleton() {
  return (
    <>
      <BtnSkeletonTxt animated={true} fullWidth={false}></BtnSkeletonTxt>
      <BtnSkeletonTxt animated={true} fullWidth={false}></BtnSkeletonTxt>
      <BtnSkeletonTxt animated={true} fullWidth={false}></BtnSkeletonTxt>
      <BtnSkeletonTxt animated={true} fullWidth={false}></BtnSkeletonTxt>
      <BtnSkeletonTxt animated={true} fullWidth={true}></BtnSkeletonTxt>
    </>
  );
}

export default SrsStagesLoadingSkeleton;
