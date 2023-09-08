import { Col } from "./SubjectDetailsStyled";
import { SubjectType } from "../types/Subject";
import { IonBadge, IonButton, IonSkeletonText } from "@ionic/react";
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

  --box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
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

  &:focus {
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

  margin: 0;
  font-size: ${({ detailfontsize }) => detailfontsize};
  overflow: hidden;
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

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

export const SubjInfoCol = styled(Col)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

// TODO: change to use Button component
export const BaseReviewLessonButton = styled(IonButton)`
  min-height: 100px;
  height: 100%;
  border-radius: 8px;
  position: relative;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;

  p {
    position: absolute;
    margin: 0;
    bottom: 2px;
    left: 0;
    color: white;
    font-weight: 600;
    font-size: 1rem;
  }

  &:focus {
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
  right: 0;
  bottom: 2px;
  font-size: 1rem;
  background-color: var(--deep-purple-accent);
  color: white;
`;
