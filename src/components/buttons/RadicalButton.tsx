import ImageFallback from "../ImageFallback";
import {
  BtnWithTxt,
  BtnWithImage,
  SubjBtnTxt,
  SubjInfoCol,
} from "./SubjectButtonsStyled";

import { Subject } from "../../types/Subject";
import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  clickDisabled: boolean | undefined;
  onBtnClick: (e: any) => void;
  showDetails: boolean;
};

// TODO: add more space b/t character and meaning
export const RadicalButton = ({
  subject,
  isBigBtn,
  clickDisabled,
  showDetails,
  onBtnClick,
}: Props) => {
  return (
    <>
      {subject.useImage ? (
        <BtnWithImage
          title="Radical Subject"
          onClick={onBtnClick}
          disabled={clickDisabled}
          bigBtn={isBigBtn}
        >
          <ImageFallback
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
        </BtnWithImage>
      ) : (
        <BtnWithTxt
          title="Radical Subject"
          onClick={onBtnClick}
          disabled={clickDisabled}
          bigBtn={isBigBtn}
          subjType="radical"
        >
          <SubjInfoCol>
            <SubjBtnTxt bigBtn={isBigBtn}>{subject.characters}</SubjBtnTxt>
            {showDetails && getSubjectDisplayName(subject)}
          </SubjInfoCol>
        </BtnWithTxt>
      )}
    </>
  );
};
