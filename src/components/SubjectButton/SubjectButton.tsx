import { IonRow, useIonPopover } from "@ionic/react";
import { Subject } from "../../types/Subject";
import SubjCardPopover from "./SubjCardPopover";
import RadicalButton from "./RadicalButton";
import KanjiButton from "./KanjiButton";
import SubjectButtonLoading from "./SubjectButtonLoading";
import { Assignment } from "../../types/Assignment";
import { useNavigate } from "react-router-dom";

// TODO: use a context around this or abstract things out, this many props is icky
type SubjProps = {
  subject: Subject;
  assignment: Assignment | undefined;
  locked: boolean;
  useLockedStyle: boolean;
  isButtonLink?: boolean;
  showDetails?: boolean;
};

function SubjectButton({
  subject,
  assignment,
  locked,
  useLockedStyle,
  isButtonLink = false,
  showDetails = true,
}: SubjProps) {
  const navigate = useNavigate();

  const [present] = useIonPopover(SubjCardPopover, {
    size: "cover",
    subject,
    assignment,
    navigate,
  });

  const onClickEvent = (e: any) => {
    if (isButtonLink) {
      navigate(`/subjects/${subject.id}`);
    } else {
      present({
        event: e.nativeEvent,
        size: "auto",
        alignment: "center",
        dismissOnSelect: true,
      });
    }
  };

  return (
    <IonRow className="ion-justify-content-center">
      {(subject && assignment) || (subject && locked) ? (
        subject.object === "radical" ? (
          <RadicalButton
            subject={subject}
            isBigBtn={isButtonLink}
            onBtnClick={onClickEvent}
            showDetails={showDetails}
          />
        ) : (
          <KanjiButton
            subject={subject}
            isBigBtn={isButtonLink}
            onBtnClick={onClickEvent}
            locked={useLockedStyle && locked}
            showDetails={showDetails}
          />
        )
      ) : (
        <SubjectButtonLoading />
      )}
    </IonRow>
  );
}

export default SubjectButton;
