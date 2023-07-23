import React from "react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Radical, Subject } from "../../types/Subject";
import { UserNote } from "../subject-details/UserNote";

type Props = {
  radical: Radical;
};

export const RadicalNameMnemonic = ({ radical }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Name Mnemonic</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
      <UserNote
        subject={radical as Subject}
        noteType="meaning"
        isRadical={true}
      />
    </SubjDetailSection>
  );
};
