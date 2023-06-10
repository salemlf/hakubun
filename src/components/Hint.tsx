import { TxtWithSubjTags } from "./TxtWithSubjTags";
import styled from "styled-components/macro";
import { IonIcon } from "@ionic/react";
import hintIcon from "../images/hint.svg";

const HintContainer = styled.div`
  background-color: var(--hint-bg);
  border-radius: 15px;
  padding: 8px;

  p {
    margin: 0;
    font-size: 0.875rem;
  }
`;

const HintHeading = styled.h6`
  margin: 3px 0;
  font-size: 0.875rem;
  font-weight: 600;
`;

const HintIcon = styled(IonIcon)`
  margin-right: 5px;
  vertical-align: text-top;
`;

type Props = {
  hint: string;
};

export const Hint = ({ hint }: Props) => {
  return (
    <HintContainer>
      <HintHeading>
        <HintIcon src={hintIcon} />
        Hint
      </HintHeading>
      <TxtWithSubjTags textWithTags={hint} />
    </HintContainer>
  );
};
