import ImageFallback from "../ImageFallback/ImageFallback";
import {
  BtnWithTxt,
  BtnWithImage,
  SubjBtnDetailsTxt,
  SubjInfoCol,
} from "../../styles/SubjectButtonsStyled";

import { Subject } from "../../types/Subject";
import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService";
import SubjectChars from "../SubjectChars/SubjectChars";
import { ButtonSize } from "../../types/MiscTypes";
import { getSubjectBtnSize } from "../../services/MiscService";

type Props = {
  subject: Subject;
  btnSize: ButtonSize;
  onBtnClick: (e: any) => void;
  showDetails: boolean;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
// TODO: add more space b/t character and meaning
function RadicalButton({ subject, showDetails, btnSize, onBtnClick }: Props) {
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

export default RadicalButton;
