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
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { ButtonSize } from "../../types/MiscTypes";
import { getSubjectBtnSize } from "../../services/MiscService/MiscService";
import { forwardRef } from "react";

type ButtonRef = HTMLButtonElement;

type Props = {
  subject: Subject;
  btnSize: ButtonSize;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

export const KanjiButton = forwardRef<ButtonRef, Props>(
  (
    { subject, showDetails, btnSize, locked, onBtnClick, ...props },
    forwardedRef
  ) => {
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
        ref={forwardedRef}
        {...props}
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
);
