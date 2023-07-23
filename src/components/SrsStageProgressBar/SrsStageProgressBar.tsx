import { IonRow, IonSkeletonText } from "@ionic/react";
import { Assignment } from "../../types/Assignment";
import styled from "styled-components/macro";

const ProgressWrapper = styled(IonRow)`
  margin-top: 5px;
  justify-content: center;
`;

const BarStepContainer = styled.div`
  width: 100%;
  max-width: 3rem;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  margin: 0;
  border-radius: 20px;

  & :first-child {
    border-radius: 20px 0px 0px 20px;
  }

  & :last-child {
    border-radius: 0px 20px 20px 0px;
  }

  & :not(:last-child) {
    border-right: 2px solid var(--light-greyish-purple);
  }
`;

type BlockProps = {
  isFilled: boolean;
};

const StepBlock = styled.div<BlockProps>`
  height: 100%;
  background-color: #cce0d4;
  width: 5rem;
  ${({ isFilled }) => isFilled && "background-color: var(--ion-color-success)"}
`;

interface BarStagesProps {
  stage: number;
  passedAt: Date | null;
}

function StepProgressBarStages({ stage, passedAt }: BarStagesProps) {
  const fillProgressBar = (stage: number) => {
    const stagesComplete = new Set();

    // checks what stage is, then adds that number and below to the set to indicate they're complete. If already passed defaults to 5
    // ex. 1: stage = 1 -> set = [1]
    // ex. 2: stage 3 -> set = [1, 2, 3]
    for (let i = stage; i >= 1; i--) {
      // TODO: change so not all these if statements
      if (passedAt !== null) {
        [1, 2, 3, 4, 5].forEach(stagesComplete.add, stagesComplete);
      } else if (!stagesComplete.has(i)) {
        stagesComplete.add(i);
      } else {
        stagesComplete.delete(i);
      }
    }

    return stagesComplete;
  };

  const renderDivs = () => {
    let stagesComplete = fillProgressBar(stage);
    let divs = [];
    for (let i = 1; i <= 5; i++) {
      divs.push(
        <StepBlock isFilled={stagesComplete.has(i)} key={i}></StepBlock>
      );
    }
    return divs;
  };

  return <BarStepContainer>{renderDivs()}</BarStepContainer>;
}

const StepProgressBarLoading = () => {
  return (
    <BarStepContainer>
      <IonSkeletonText animated={true}></IonSkeletonText>
    </BarStepContainer>
  );
};

type Props = {
  assignment: Assignment | undefined;
  locked: boolean;
};

function SrsStageProgressBar({ assignment, locked }: Props) {
  return (
    <ProgressWrapper>
      {assignment || locked ? (
        <StepProgressBarStages
          stage={assignment?.srs_stage || 0}
          passedAt={assignment?.passed_at || null}
        ></StepProgressBarStages>
      ) : (
        <StepProgressBarLoading />
      )}
    </ProgressWrapper>
  );
}

export default SrsStageProgressBar;
