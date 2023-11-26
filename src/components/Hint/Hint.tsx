import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import SvgIcon from "../SvgIcon";
import HintIcon from "../../images/hint.svg?react";
import {
  IconHeadingContainer,
  NoteHintContainer,
  NoteHintHeading,
} from "../../styles/BaseStyledComponents";

type Props = {
  hint: string;
};

function Hint({ hint }: Props) {
  return (
    <NoteHintContainer>
      <IconHeadingContainer>
        <SvgIcon icon={<HintIcon />} width="1.5em" height="1.5em" />
        <NoteHintHeading>Hint</NoteHintHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={hint} txtSize=".9rem" />
    </NoteHintContainer>
  );
}

export default Hint;
