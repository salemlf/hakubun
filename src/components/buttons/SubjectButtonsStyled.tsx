import styled from "styled-components/macro";
import { Col } from "../subject-details/SubjectDetailsStyled";
import { SubjectType } from "../../types/Subject";

type DefaultBtnProps = {
  bigBtn: boolean;
};

export const DefaultBtn = styled.button<DefaultBtnProps>`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ bigBtn }) => (bigBtn ? "5.2rem" : "3rem")};
  height: ${({ bigBtn }) => (bigBtn ? "5.2rem" : "3rem")};

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

  p {
    margin: 0;
    color: white;
    font-size: 2rem;
  }
`;

export const SubjBtnDetailsTxt = styled.span`
  display: block;
  font-size: 0.75rem;
`;

export const BtnWithImage = styled(DefaultBtn)`
  background-color: var(--wanikani-blue);
  padding: 4px;

  img {
    width: 100%;
    filter: brightness(0) invert(1);
  }
`;

export const SubjInfoCol = styled(Col)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
