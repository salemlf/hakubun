import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTimeFromNow } from "../../services/MiscService";
import { Subject, SubjectType } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import PopoverContent, { PopoverTrigger, PopoverRoot } from "../Popover";
import SubjectChars from "../SubjectChars";
import SvgIcon from "../SvgIcon";
import AlarmClockIcon from "../../images/alarm-clock.svg?react";
import styled from "styled-components";

type PopoverProps = {
  subjType: SubjectType;
};

const PopoverContainerStyled = styled.button<PopoverProps>`
  width: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  flex-direction: column;
  --inner-border-width: 0;

  background-color: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};
  --background: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};

  color: var(--text-color);
  --color: var(--text-color);
`;

const SubjectTimeTill = styled.p`
  margin: 0;
  font-size: 1.25rem;
`;

const TxtContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const TimeTillReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

type PopoverSubjButtonProps = {
  children: React.ReactNode;
  subject: Subject;
  assignment: Assignment | undefined;
};

export const PopoverSubjButton = ({
  children,
  subject,
  assignment,
}: PopoverSubjButtonProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onPopoverClick = (e: any) => {
    setIsOpen(false);
    navigate(`/subjects/${subject.id}`);
  };

  let timeTill;
  if (assignment) {
    let availTime = assignment.available_at;
    timeTill = getTimeFromNow(availTime);
  } else {
    // TODO: display locked icon instead
    timeTill = "Locked";
  }

  return (
    <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent isOpen={isOpen}>
        <PopoverContainerStyled
          subjType={subject.object}
          onClick={onPopoverClick}
        >
          <TxtContainer>
            <SubjectChars subject={subject} fontSize="4rem" />
            <TimeTillReviewContainer>
              {/* <AlarmClock src={AlarmClockIcon} /> */}
              <SvgIcon icon={<AlarmClockIcon />} width="1.5em" height="1.5em" />
              <SubjectTimeTill>{timeTill}</SubjectTimeTill>
            </TimeTillReviewContainer>
          </TxtContainer>
        </PopoverContainerStyled>
      </PopoverContent>
    </PopoverRoot>
  );
};
