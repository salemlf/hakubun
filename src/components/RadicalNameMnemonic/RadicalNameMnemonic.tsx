import { Radical, Subject } from "../../types/Subject";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import SvgIcon from "../SvgIcon";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import MeaningIcon from "../../images/meaning.svg?react";
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
        <SvgIcon icon={<MeaningIcon />} width="1.5em" height="1.5em" />
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
