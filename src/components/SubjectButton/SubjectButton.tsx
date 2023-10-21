import { useIonPopover } from "@ionic/react";
import { Subject } from "../../types/Subject";
import SubjCardPopover from "./SubjCardPopover";
import RadicalButton from "./RadicalButton";
import KanjiButton from "./KanjiButton";
import SubjectButtonLoading from "./SubjectButtonLoading";
import { Assignment } from "../../types/Assignment";
import { useNavigate } from "react-router-dom";
import { ButtonSize } from "../../types/MiscTypes";

// TODO: abstract things out, this many props is icky
type SubjProps = {
  subject: Subject;
  assignment: Assignment | undefined;
  locked: boolean;
  useLockedStyle: boolean;
  btnSize: ButtonSize;
  isButtonLink?: boolean;
  showDetails?: boolean;
};

// TODO: refactor this to use composition instead of conditional rendering
function SubjectButton({
  subject,
  assignment,
  locked,
  useLockedStyle,
  btnSize,
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
    <>
      {(subject && assignment) || (subject && locked) ? (
        subject.object === "radical" ? (
          <RadicalButton
            subject={subject}
            btnSize={btnSize}
            onBtnClick={onClickEvent}
            showDetails={showDetails}
          />
        ) : (
          <KanjiButton
            subject={subject}
            btnSize={btnSize}
            onBtnClick={onClickEvent}
            locked={useLockedStyle && locked}
            showDetails={showDetails}
          />
        )
      ) : (
        <SubjectButtonLoading btnSize={btnSize} />
      )}
    </>
  );
}

export default SubjectButton;
