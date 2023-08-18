import { IonNavLink } from "@ionic/react";
import { Subject } from "../../types/Subject";
import {
  BtnWithTxt,
  SubjBtnDetailsTxt,
  SubjInfoCol,
} from "../../styles/SubjectButtonsStyled";
import SubjectChars from "../SubjectChars/SubjectChars";
import {
  getPrimaryReading,
  getSubjectDisplayName,
} from "../../services/SubjectAndAssignmentService";
import { ReviewSettings } from "../../pages/ReviewSettings";
import styled from "styled-components";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

// TODO: improve text overflow method
const KanjiMeaning = styled(SubjBtnDetailsTxt)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 4em;
`;

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
function KanjiButton({
  subject,
  isBigBtn,
  locked,
  showDetails,
  onBtnClick,
}: Props) {
  // kanji always have readings, so using ! for subject.readings
  return (
    <IonNavLink routerDirection="forward" component={() => <ReviewSettings />}>
      <BtnWithTxt
        title="Kanji Subject"
        onClick={onBtnClick}
        subjType="kanji"
        bigBtn={isBigBtn}
        lockedStyle={locked}
      >
        <SubjInfoCol>
          <SubjectChars subject={subject} fontSize="2rem" />
          {showDetails && (
            <div>
              <SubjBtnDetailsTxt>
                {getPrimaryReading(subject.readings!)}
              </SubjBtnDetailsTxt>
              <KanjiMeaning>{getSubjectDisplayName(subject)}</KanjiMeaning>
            </div>
          )}
        </SubjInfoCol>
      </BtnWithTxt>
    </IonNavLink>
  );
}

export default KanjiButton;
