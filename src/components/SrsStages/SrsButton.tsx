import { motion } from "framer-motion";
import { countAssignmentTypesInSrsStage } from "./SrsStages.service";
import {
  getSrsLevelColor,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { SrsLevelName } from "../../types/MiscTypes";
import { AssignmentTypeGroupCount } from "./SrsStages.types";
import { SubjectType } from "../../types/Subject";
import styled from "styled-components";

type ButtonProps = {
  srsStage: SrsLevelName;
  fullWidth: boolean;
};

export const SrsStageButton = styled.button<ButtonProps>`
  width: 100%;
  margin: 0;
  padding: 0;
  color: white;
  border-radius: 6px;
  border: 2px solid black;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 1px;
  }
  grid-column: ${({ fullWidth }) => fullWidth && "1 / 3"};
  display: grid;
`;

const NumItemsInStage = styled.p`
  margin: 8px 0 5px 0;
  font-size: 1rem;
`;

const StageNameAndNumItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 5px;
`;

const StageName = styled.p`
  margin: 8px 0 3px 0;
  flex-basis: 100%;
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
`;

const NumInStageContainer = styled(motion.div)`
  overflow: hidden;
`;

type SubjTypeRowProps = {
  assignmentType: SubjectType;
};

const SubjTypeRow = styled.div<SubjTypeRowProps>`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin: 0;
  padding: 5px 8px;
  background: ${({ assignmentType }) => getSubjectColor(assignmentType)};
  font-size: 1rem;
`;

const SubjTypeContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 4);
  overflow: hidden;
  border-top: 2px solid black;
`;

const SubjTypeLabel = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: left;
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
  stageName: SrsLevelName;
  ariaLabel: string;
  showStageDetails: boolean;
  setShowDetails: (shouldShow: boolean) => void;
  fullWidth?: boolean;
};

function SrsButton({
  stageData,
  stageName,
  ariaLabel,
  showStageDetails,
  setShowDetails,
  fullWidth = false,
}: SRSStageButtonProps) {
  const stageGroupedByAssignmentType: AssignmentTypeGroupCount =
    countAssignmentTypesInSrsStage(stageData);

  return (
    <SrsStageButton
      srsStage={stageName}
      aria-label={ariaLabel}
      onClick={() => setShowDetails(!showStageDetails)}
      fullWidth={fullWidth}
      style={{
        alignItems: showStageDetails ? "flex-end" : "center",
      }}
    >
      <StageNameAndNumItemsContainer>
        <StageName>{stageName}</StageName>
        <NumInStageContainer
          initial={false}
          animate={showStageDetails ? "hide" : "display"}
        >
          <NumItemsInStage>{stageData.length}</NumItemsInStage>
        </NumInStageContainer>
      </StageNameAndNumItemsContainer>
      <SubjTypeContainer
        initial={false}
        variants={buttonVariants}
        animate={showStageDetails ? "display" : "hide"}
        style={{
          borderRadius: "0 0 4px 4px",
        }}
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
          <SubjTypeLabel>Kana Vocab</SubjTypeLabel>
          <SubjTypeCount>
            {stageGroupedByAssignmentType.kana_vocabulary}
          </SubjTypeCount>
        </SubjTypeRow>
      </SubjTypeContainer>
    </SrsStageButton>
  );
}

export default SrsButton;
