import { IonNav, IonNavLink } from "@ionic/react";
import { ReviewSettings } from "../../pages/ReviewSettings";
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
import { SubjectChars } from "../SubjectChars";

// TODO: change to use size sm, md, lg?
type Props = {
  subject: Subject;
  isBigBtn: boolean;
  locked: boolean;
  showDetails: boolean;
  onBtnClick: (e: any) => void;
};

export const KanjiButton = ({
  subject,
  isBigBtn,
  locked,
  showDetails,
  onBtnClick,
}: Props) => {
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
              <SubjBtnDetailsTxt>
                {getSubjectDisplayName(subject)}
              </SubjBtnDetailsTxt>
            </div>
          )}
        </SubjInfoCol>
      </BtnWithTxt>
    </IonNavLink>
  );
};
