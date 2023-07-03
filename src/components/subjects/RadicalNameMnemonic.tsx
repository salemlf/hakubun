import React from "react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Radical } from "../../types/Subject";

type Props = {
  radical: Radical;
};

export const RadicalNameMnemonic = ({ radical }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Name Mnemonic</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
    </SubjDetailSection>
  );
};
