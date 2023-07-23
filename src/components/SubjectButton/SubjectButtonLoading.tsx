import { IonSkeletonText } from "@ionic/react";
import styled from "styled-components/macro";

const SubjectButtonSkeleton = styled(IonSkeletonText)`
  margin: 0;
  border-radius: 12px;
  display: flex;
  width: 3rem;
  height: 3rem;
`;

// TODO: use prop for specifying size
function SubjectButtonLoading() {
  return <SubjectButtonSkeleton animated={true}></SubjectButtonSkeleton>;
}

export default SubjectButtonLoading;
