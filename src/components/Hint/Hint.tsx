import { IonIcon } from "@ionic/react";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import {
  IconHeadingContainer,
  NoteHintContainer,
  NoteHintHeading,
} from "../styles/BaseStyledComponents";
import hintIcon from "../../images/hint.svg";

type Props = {
  hint: string;
};

function Hint({ hint }: Props) {
  return (
    <NoteHintContainer>
      <IconHeadingContainer>
        <IonIcon src={hintIcon} />
        <NoteHintHeading>Hint</NoteHintHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={hint} />
    </NoteHintContainer>
  );
}

export default Hint;
