import { BtnWithTxt, SubjBtnTxt, SubjInfoCol } from "./SubjectButtonsStyled";
import { Subject } from "../../types/Subject";
import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  clickDisabled: boolean | undefined;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

// TODO: add more space b/t character and meaning
// TODO: add reading text
export const KanjiButton = ({
  subject,
  isBigBtn,
  clickDisabled,
  locked,
  showDetails,
  onBtnClick,
}: Props) => {
  return (
    <BtnWithTxt
      title="Kanji Subject"
      onClick={onBtnClick}
      disabled={clickDisabled}
      subjType="kanji"
      bigBtn={isBigBtn}
      lockedStyle={locked}
    >
      <SubjInfoCol>
        <SubjBtnTxt bigBtn={isBigBtn}>{subject.characters}</SubjBtnTxt>
        {showDetails && getSubjectDisplayName(subject)}
      </SubjInfoCol>
    </BtnWithTxt>
  );
};
