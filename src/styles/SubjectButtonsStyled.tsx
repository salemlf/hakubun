import { IonBadge, IonSkeletonText } from "@ionic/react";
import { SubjectType } from "../types/Subject";
import Button from "../components/Button";
import styled from "styled-components";

type DefaultBtnProps = {
  containersize: string;
  subjcharsize: string;
};

export const DefaultBtn = styled.button<DefaultBtnProps>`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ containersize }) => containersize};
  height: ${({ containersize }) => containersize};

  img {
    width: ${({ subjcharsize }) => subjcharsize};
    filter: brightness(0) invert(1);
  }

  border: 2px solid black;
`;

type TxtBtnProps = {
  subjType: SubjectType;
  lockedStyle?: boolean;
};

export const BtnWithTxt = styled(DefaultBtn)<TxtBtnProps>`
  background-color: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};
  background-color: ${({ lockedStyle }) =>
    lockedStyle && `var(--ion-color-step-300)`};

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

type DetailsBtnProps = {
  detailfontsize: string;
};

export const SubjBtnDetailsTxt = styled.p<DetailsBtnProps>`
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  color: white;

  margin: 0;
  font-size: ${({ detailfontsize }) => detailfontsize};
  /* needs to be clipped, for some reason hidden also hides y-axis overflow */
  overflow-x: clip;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 4em;

  &:last-of-type {
    margin-top: 2px;
  }
`;

export const JapaneseDetailsTxt = styled(SubjBtnDetailsTxt)`
  font-family: var(--japanese-font-family);
`;

export const BtnWithImage = styled(DefaultBtn)`
  background-color: var(--wanikani-blue);
  padding: 4px;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

export const SubjInfoCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const BaseReviewLessonButton = styled(Button)`
  width: 100%;
  min-height: 100px;
  height: 100%;
  border-radius: 8px;
  position: relative;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid black;

  p {
    position: absolute;
    margin: 0;
    bottom: 6px;
    left: 10px;
    color: white;
    font-weight: 600;
    font-size: 1.25rem;
  }

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

export const BaseReviewLessonButtonSkeleton = styled(IonSkeletonText)`
  min-height: 100px;
  height: 100%;
  border-radius: 8px;
`;

export const BaseReviewLessonButtonBadge = styled(IonBadge)`
  position: absolute;
  right: 10px;
  bottom: 6px;
  font-size: 1rem;
  background-color: var(--deep-purple-accent);
  color: white;
`;
