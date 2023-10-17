import { useState } from "react";
import { motion } from "framer-motion";
import { SrsLevelName } from "../../types/MiscTypes";
import {
  getSrsLevelColor,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService";
import { countAssignmentTypesInSrsStage } from "./SrsStages.service";
import { useAssignmentsByStage } from "../../hooks/useAssignmentsByStage";
import { AssignmentTypeGroupCount, SrsStageName } from "./SrsStages.types";
import { Assignment, AssignmentType } from "../../types/Assignment";
import SrsStagesLoadingSkeleton from "./SrsStagesLoadingSkeleton";
import styled from "styled-components";

const SrsButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 5px;
  width: 100%;
  gap: 5px;
`;

function SrsStages() {
  const [showStageDetails, setShowStageDetails] = useState<boolean>(false);

  const {
    isLoading: apprenticeStageDataLoading,
    data: apprenticeStageData,
    error: apprenticeStageErr,
  } = useAssignmentsByStage("apprentice");

  const {
    isLoading: guruStageDataLoading,
    data: guruStageData,
    error: guruStageDataErr,
  } = useAssignmentsByStage("guru");

  const {
    isLoading: masterStageDataLoading,
    data: masterStageData,
    error: masterStageErr,
  } = useAssignmentsByStage("master");

  const {
    isLoading: enlightenedStageDataLoading,
    data: enlightenedStageData,
    error: enlightenedStageErr,
  } = useAssignmentsByStage("enlightened");

  const {
    isLoading: burnedStageDataLoading,
    data: burnedStageData,
    error: burnedStageErr,
  } = useAssignmentsByStage("burned");

  let stagesLoading =
    apprenticeStageDataLoading ||
    guruStageDataLoading ||
    masterStageDataLoading ||
    enlightenedStageDataLoading ||
    burnedStageDataLoading;

  if (stagesLoading) {
    return (
      <SrsButtonContainer>
        <SrsStagesLoadingSkeleton></SrsStagesLoadingSkeleton>
      </SrsButtonContainer>
    );
  }

  return (
    <SrsButtonContainer>
      <SRSButton
        stageName="apprentice"
        stageData={apprenticeStageData}
        ariaLabel="Apprentice SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SRSButton
        stageName="guru"
        stageData={guruStageData}
        ariaLabel="Guru SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SRSButton
        stageName="master"
        stageData={masterStageData}
        ariaLabel="Master SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SRSButton
        stageName="enlightened"
        stageData={enlightenedStageData}
        ariaLabel="Enlightened SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SRSButton
        stageName="burned"
        stageData={burnedStageData}
        ariaLabel="Burned SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
        fullWidth={true}
      />
    </SrsButtonContainer>
  );
}

const NumItemsInStage = styled.p`
  margin: 5px 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const NumInStageContainer = styled(motion.div)`
  overflow: hidden;
`;

const StageName = styled.p`
  margin: 5px 0 15px 0;
  font-size: 1rem;
  text-transform: uppercase;
`;

type ButtonProps = {
  srsStage: SrsLevelName;
  fullWidth: boolean;
};

const SrsStageButton = styled.button<ButtonProps>`
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  color: white;
  border-radius: 6px;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
  grid-column: ${({ fullWidth }) => fullWidth && "1 / 3"};
  display: grid;

  align-content: flex-end;
`;

const SubjTypeContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 4);
  overflow: hidden;
`;

type SubjTypeRowProps = {
  assignmentType: AssignmentType;
};

const SubjTypeRow = styled.div<SubjTypeRowProps>`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin: 0;
  padding: 5px 8px;
  background: ${({ assignmentType }) => getSubjectColor(assignmentType)};
  font-size: 1rem;
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

const SubjTypeLabel = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const SubjTypeCount = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const buttonVariants = {
  display: {
    height: "auto",
    opacity: 1,
    display: "block",
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  hide: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

type SRSStageButtonProps = {
  stageData: Assignment[];
  stageName: SrsStageName;
  ariaLabel: string;
  showStageDetails: boolean;
  setShowDetails: (shouldShow: boolean) => void;
  fullWidth?: boolean;
};

const SRSButton = ({
  stageData,
  stageName,
  ariaLabel,
  showStageDetails,
  setShowDetails,
  fullWidth = false,
}: SRSStageButtonProps) => {
  let stageGroupedByAssignmentType: AssignmentTypeGroupCount =
    countAssignmentTypesInSrsStage(stageData);

  return (
    <SrsStageButton
      srsStage={stageName}
      aria-label={ariaLabel}
      onClick={() => setShowDetails(!showStageDetails)}
      fullWidth={fullWidth}
    >
      <NumInStageContainer
        initial={false}
        variants={buttonVariants}
        animate={showStageDetails ? "hide" : "display"}
      >
        <NumItemsInStage>{stageData.length}</NumItemsInStage>
      </NumInStageContainer>
      <StageName>{stageName}</StageName>
      <SubjTypeContainer
        initial={false}
        variants={buttonVariants}
        animate={showStageDetails ? "display" : "hide"}
      >
        <SubjTypeRow assignmentType="radical">
          <SubjTypeLabel>Radicals</SubjTypeLabel>
          <SubjTypeCount>{stageGroupedByAssignmentType.radical}</SubjTypeCount>
        </SubjTypeRow>
        <SubjTypeRow assignmentType="kanji">
          <SubjTypeLabel>Kanji</SubjTypeLabel>
          <SubjTypeCount>{stageGroupedByAssignmentType.kanji}</SubjTypeCount>
        </SubjTypeRow>
        <SubjTypeRow assignmentType="vocabulary">
          <SubjTypeLabel>Vocabulary</SubjTypeLabel>
          <SubjTypeCount>
            {stageGroupedByAssignmentType.vocabulary}
          </SubjTypeCount>
        </SubjTypeRow>
        <SubjTypeRow assignmentType="kana_vocabulary">
          <SubjTypeLabel>Kana Vocabulary</SubjTypeLabel>
          <SubjTypeCount>
            {stageGroupedByAssignmentType.kana_vocabulary}
          </SubjTypeCount>
        </SubjTypeRow>
      </SubjTypeContainer>
    </SrsStageButton>
  );
};

export default SrsStages;
