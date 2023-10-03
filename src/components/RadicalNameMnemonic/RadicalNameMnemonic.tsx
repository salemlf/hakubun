import { IonIcon } from "@ionic/react";
import { Radical, Subject } from "../../types/Subject";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import MeaningIcon from "../../images/meaning.svg";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const RadicalNameSection = styled(SubjDetailSection)`
  margin-bottom: 18px;
`;

type Props = {
  radical: Radical;
};

function RadicalNameMnemonic({ radical }: Props) {
  return (
    <RadicalNameSection>
      <IconHeadingContainer>
        <IonIcon src={MeaningIcon} />
        <SubjDetailSubHeading>Name Mnemonic</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
      <UserNote
        subject={radical as Subject}
        noteType="meaning"
        isRadical={true}
      />
    </RadicalNameSection>
  );
}

export default RadicalNameMnemonic;
