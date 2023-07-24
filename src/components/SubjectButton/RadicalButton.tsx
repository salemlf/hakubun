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

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  onBtnClick: (e: any) => void;
  showDetails: boolean;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
// TODO: add more space b/t character and meaning
function RadicalButton({ subject, isBigBtn, showDetails, onBtnClick }: Props) {
  return (
    <>
      {subject.useImage ? (
        <BtnWithImage
          title="Radical Subject"
          onClick={onBtnClick}
          bigBtn={isBigBtn}
        >
          <SubjInfoCol>
            <ImageFallback
              images={subject.availableImages}
              altText={subject.meaning_mnemonic}
            ></ImageFallback>
            {showDetails && (
              <div>
                <SubjBtnDetailsTxt>
                  {getSubjectDisplayName(subject)}
                </SubjBtnDetailsTxt>
              </div>
            )}
          </SubjInfoCol>
        </BtnWithImage>
      ) : (
        <BtnWithTxt
          title="Radical Subject"
          onClick={onBtnClick}
          bigBtn={isBigBtn}
          subjType="radical"
        >
          <SubjInfoCol>
            <SubjectChars subject={subject} fontSize="2rem" />
            {/* <p>{subject.characters}</p> */}
            {showDetails && (
              <div>
                <SubjBtnDetailsTxt>
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
