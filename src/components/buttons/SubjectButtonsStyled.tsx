import styled from "styled-components/macro";
import { Col } from "../subject-details/SubjectDetailsStyled";
import { SubjectType } from "../../types/Subject";
import { IonBadge, IonButton, IonSkeletonText } from "@ionic/react";

type DefaultBtnProps = {
  bigBtn: boolean;
};

export const DefaultBtn = styled.button<DefaultBtnProps>`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ bigBtn }) => (bigBtn ? "5rem" : "3rem")};
  height: ${({ bigBtn }) => (bigBtn ? "5rem" : "3rem")};

  --box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

type TxtBtnProps = {
  lockedStyle?: boolean;
  subjType: SubjectType;
  bigBtn: boolean;
};

export const BtnWithTxt = styled(DefaultBtn)<TxtBtnProps>`
  background-color: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};
  background-color: ${({ lockedStyle }) =>
    lockedStyle && `var(--ion-color-step-300)`};

  &:focus {
    outline: 4px solid var(--ion-color-tertiary);
    --outline: 4px solid var(--ion-color-tertiary);
  }
`;

export const SubjBtnDetailsTxt = styled.p`
  margin: 0;
  font-size: 0.75rem;

  &:last-of-type {
    margin-top: 2px;
  }
`;

export const BtnWithImage = styled(DefaultBtn)`
  background-color: var(--wanikani-blue);
  padding: 4px;

  img {
    width: 2rem;
    filter: brightness(0) invert(1);
  }

  &:focus {
    outline: 4px solid var(--ion-color-tertiary);
    --outline: 4px solid var(--ion-color-tertiary);
  }
`;

export const SubjInfoCol = styled(Col)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

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
    bottom: 10px;
    left: 0;
    color: white;
    font-weight: 600;
  }

  &:focus {
    outline: 4px solid var(--ion-color-tertiary);
    --outline: 4px solid var(--ion-color-tertiary);
  }
`;

export const BaseReviewLessonButtonSkeleton = styled(IonSkeletonText)`
  min-height: 100px;
  height: 100%;
  border-radius: 8px;
`;

export const BaseReviewLessonButtonBadge = styled(IonBadge)`
  position: absolute;
  bottom: 10px;
  right: 0;
  background-color: var(--deep-purple-accent);
  color: white;
`;
