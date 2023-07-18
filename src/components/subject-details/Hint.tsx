import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { IonIcon } from "@ionic/react";
import hintIcon from "../../images/hint.svg";
import {
  NoteHintContainer,
  NoteHintHeading,
  IconHeadingContainer,
} from "../styles/BaseStyledComponents";

type Props = {
  hint: string;
};

export const Hint = ({ hint }: Props) => {
  return (
    <NoteHintContainer>
      <IconHeadingContainer>
        <IonIcon src={hintIcon} />
        <NoteHintHeading>Hint</NoteHintHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={hint} />
    </NoteHintContainer>
  );
};
