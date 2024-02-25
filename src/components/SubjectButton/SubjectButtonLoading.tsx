import { IonSkeletonText } from "@ionic/react";
import { getSubjectBtnSize } from "../../services/MiscService/MiscService";
import { ButtonSize } from "../../types/MiscTypes";
import styled from "styled-components";

type SkeletonProps = {
  containersize: string;
};

const SubjectButtonSkeleton = styled(IonSkeletonText)<SkeletonProps>`
  display: flex;
  width: ${({ containersize }) => containersize};
  height: ${({ containersize }) => containersize};
  margin: 0;
  border-radius: 12px;
`;

type Props = {
  btnSize: ButtonSize;
};

// TODO: use prop for specifying size
function SubjectButtonLoading({ btnSize }: Props) {
  const containerSize = getSubjectBtnSize(btnSize).containerSize;

  return (
    <SubjectButtonSkeleton
      animated={true}
      containersize={containerSize}
    ></SubjectButtonSkeleton>
  );
}

export default SubjectButtonLoading;
