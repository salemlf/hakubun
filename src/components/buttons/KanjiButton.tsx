import {
  BtnWithTxt,
  SubjBtnDetailsTxt,
  SubjInfoCol,
} from "./SubjectButtonsStyled";
import { Subject } from "../../types/Subject";
import {
  getSubjectDisplayName,
  getPrimaryReading,
} from "../../services/SubjectAndAssignmentService";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

// TODO: add more space b/t character and meaning
// TODO: add reading text
export const KanjiButton = ({
  subject,
  isBigBtn,
  locked,
  showDetails,
  onBtnClick,
}: Props) => {
  return (
    <BtnWithTxt
      title="Kanji Subject"
      onClick={onBtnClick}
      subjType="kanji"
      bigBtn={isBigBtn}
      lockedStyle={locked}
    >
      <SubjInfoCol>
        <p>{subject.characters}</p>
        {showDetails && (
          <div>
            <SubjBtnDetailsTxt>{getPrimaryReading(subject)}</SubjBtnDetailsTxt>
            <SubjBtnDetailsTxt style={{ marginTop: "2px" }}>
              {getSubjectDisplayName(subject)}
            </SubjBtnDetailsTxt>
          </div>
        )}
      </SubjInfoCol>
    </BtnWithTxt>
  );
};
