import { Subject } from "../../types/Subject";
import {
  BtnWithTxt,
  JapaneseDetailsTxt,
  SubjBtnDetailsTxt,
  SubjInfoCol,
} from "../../styles/SubjectButtonsStyled";
import SubjectChars from "../SubjectChars/SubjectChars";
import {
  getPrimaryReading,
  getSubjectDisplayName,
} from "../../services/SubjectAndAssignmentService";
import { ButtonSize } from "../../types/MiscTypes";
import { getSubjectBtnSize } from "../../services/MiscService";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  btnSize: ButtonSize;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
function KanjiButton({
  subject,
  btnSize,
  locked,
  showDetails,
  onBtnClick,
}: Props) {
  const charFontSize = showDetails
    ? getSubjectBtnSize(btnSize).fontSize
    : getSubjectBtnSize(btnSize).fontSizeNoDetails;

  const containerSize = getSubjectBtnSize(btnSize).containerSize;
  const detailFontSize = getSubjectBtnSize(btnSize).detailFontSize;

  return (
    <BtnWithTxt
      containersize={containerSize}
      subjcharsize={charFontSize}
      title="Kanji Subject"
      onClick={onBtnClick}
      subjType="kanji"
      lockedStyle={locked}
    >
      <SubjInfoCol>
        <SubjectChars subject={subject} fontSize={charFontSize} />
        {showDetails && (
          <div>
            <JapaneseDetailsTxt detailfontsize={detailFontSize}>
              {/* kanji always have readings, so using ! for subject.readings */}
              {getPrimaryReading(subject.readings!)}
            </JapaneseDetailsTxt>
            <SubjBtnDetailsTxt detailfontsize={detailFontSize}>
              {getSubjectDisplayName(subject)}
            </SubjBtnDetailsTxt>
          </div>
        )}
      </SubjInfoCol>
    </BtnWithTxt>
  );
}

export default KanjiButton;
