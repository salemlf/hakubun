import { useNavigate } from "@tanstack/react-router";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import { ButtonSize } from "../../types/MiscTypes";
import { KanjiButton } from "./KanjiButton";
import { RadicalButton } from "./RadicalButton";
import { PopoverSubjButton } from "./PopoverSubjButton";
import SubjectButtonLoading from "./SubjectButtonLoading";

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

  const onClickEvent = (e: any) => {
    if (isButtonLink) {
      navigate({
        to: `/subjects/$subjId`,
        params: { subjId: subject.id },
      });
    }
  };

  return (
    <>
      {(subject && assignment) || (subject && locked) ? (
        isButtonLink ? (
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
          <>
            {subject.object === "radical" ? (
              <PopoverSubjButton subject={subject} assignment={assignment}>
                <RadicalButton
                  subject={subject}
                  btnSize={btnSize}
                  onBtnClick={onClickEvent}
                  showDetails={showDetails}
                />
              </PopoverSubjButton>
            ) : (
              <PopoverSubjButton subject={subject} assignment={assignment}>
                <KanjiButton
                  subject={subject}
                  btnSize={btnSize}
                  onBtnClick={onClickEvent}
                  locked={useLockedStyle && locked}
                  showDetails={showDetails}
                />
              </PopoverSubjButton>
            )}
          </>
        )
      ) : (
        <SubjectButtonLoading btnSize={btnSize} />
      )}
    </>
  );
}

export default SubjectButton;
