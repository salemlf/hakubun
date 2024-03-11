import ImageFallback from "../ImageFallback/ImageFallback";
import {
  BtnWithTxt,
  BtnWithImage,
  SubjBtnDetailsTxt,
  SubjInfoCol,
} from "../../styles/SubjectButtonsStyled";

import { Subject } from "../../types/Subject";
import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import SubjectChars from "../SubjectChars/SubjectChars";
import { ButtonSize } from "../../types/MiscTypes";
import { getSubjectBtnSize } from "../../services/MiscService/MiscService";
import { forwardRef } from "react";

type ButtonRef = HTMLButtonElement;

type Props = {
  subject: Subject;
  btnSize: ButtonSize;
  onBtnClick: (e: any) => void;
  showDetails: boolean;
};

// TODO: add more space b/t character and meaning
export const RadicalButton = forwardRef<ButtonRef, Props>(
  ({ subject, showDetails, btnSize, onBtnClick, ...props }, forwardedRef) => {
    const charFontSize = showDetails
      ? getSubjectBtnSize(btnSize).fontSize
      : getSubjectBtnSize(btnSize).fontSizeNoDetails;

    const containerSize = getSubjectBtnSize(btnSize).containerSize;
    const detailFontSize = getSubjectBtnSize(btnSize).detailFontSize;

    return (
      <>
        {subject.useImage ? (
          <BtnWithImage
            title="Radical Subject"
            containersize={containerSize}
            subjcharsize={charFontSize}
            onClick={onBtnClick}
            ref={forwardedRef}
            {...props}
          >
            <SubjInfoCol>
              <ImageFallback
                images={subject.availableImages}
                altText={`${getSubjectDisplayName(subject)} image`}
              ></ImageFallback>
              {showDetails && (
                <div>
                  <SubjBtnDetailsTxt detailfontsize={detailFontSize}>
                    {getSubjectDisplayName(subject)}
                  </SubjBtnDetailsTxt>
                </div>
              )}
            </SubjInfoCol>
          </BtnWithImage>
        ) : (
          <BtnWithTxt
            title="Radical Subject"
            containersize={containerSize}
            subjcharsize={charFontSize}
            onClick={onBtnClick}
            subjType="radical"
            ref={forwardedRef}
            {...props}
          >
            <SubjInfoCol>
              <SubjectChars subject={subject} fontSize={charFontSize} />
              {showDetails && (
                <div>
                  <SubjBtnDetailsTxt detailfontsize={detailFontSize}>
                    {getSubjectDisplayName(subject)}
                  </SubjBtnDetailsTxt>
                </div>
              )}
            </SubjInfoCol>
          </BtnWithTxt>
        )}
      </>
    );
  }
);
