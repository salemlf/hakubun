import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Radical, Subject } from "../../types/Subject";
import { UserNote } from "../subject-details/UserNote";
import MeaningIcon from "../../images/meaning.svg";
import { IconHeadingContainer } from "../styles/BaseStyledComponents";
import { IonIcon } from "@ionic/react";

type Props = {
  radical: Radical;
};

export const RadicalNameMnemonic = ({ radical }: Props) => {
  return (
    <SubjDetailSection>
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
    </SubjDetailSection>
  );
};
