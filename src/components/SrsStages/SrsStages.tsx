import { useState } from "react";
import { motion } from "framer-motion";
import { SrsLevelName } from "../../types/MiscTypes";
import {
  getSrsLevelColor,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { countAssignmentTypesInSrsStage } from "./SrsStages.service";
import { useAssignmentsByStage } from "../../hooks/useAssignmentsByStage";
import { AssignmentTypeGroupCount } from "./SrsStages.types";
import { Assignment } from "../../types/Assignment";
import { SubjectType } from "../../types/Subject";
import SrsStagesLoadingSkeleton from "./SrsStagesLoadingSkeleton";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";

const SrsButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 5px 0;
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

  const stagesLoading =
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

  const hasAllData =
    apprenticeStageData &&
    guruStageData &&
    masterStageData &&
    enlightenedStageData &&
    burnedStageData;

  const errOccurred =
    apprenticeStageErr ||
    guruStageDataErr ||
    masterStageErr ||
    enlightenedStageErr ||
    burnedStageErr;

  const stageNames: SrsLevelName[] = [
    "apprentice",
    "guru",
    "master",
    "enlightened",
    "burned",
  ];
  const labelSuffix = "SRS stage";

  if (errOccurred && !hasAllData) {
    return (
      <SrsButtonContainer data-testid="srs-stages-err">
        {stageNames.map((stageName) => (
          <SrsStageButton
            key={stageName}
            srsStage={stageName}
            aria-label={`${stageName} ${labelSuffix}`}
            fullWidth={stageName === "burned"}
            style={{
              alignItems: "center",
              padding: "5px",
            }}
          >
            <StageName>{stageName}</StageName>
            <ErrorMessage />
          </SrsStageButton>
        ))}
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
  margin: 8px 0 5px 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const StageNameAndNumItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const NumInStageContainer = styled(motion.div)`
  overflow: hidden;
`;

const StageName = styled.p`
  margin: 8px 0;
  flex-basis: 100%;
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
  color: white;
  border-radius: 6px;
  border: 2px solid black;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
  grid-column: ${({ fullWidth }) => fullWidth && "1 / 3"};
  display: grid;

  align-items: flex-end;
`;

const SubjTypeContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 4);
  overflow: hidden;
  border-top: 2px solid black;
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
  stageName: SrsLevelName;
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
      style={{
        alignItems: showStageDetails ? "flex-end" : "center",
        padding: showStageDetails ? 0 : "5px",
      }}
    >
      <StageNameAndNumItemsContainer>
        <NumInStageContainer
          initial={false}
          variants={buttonVariants}
          animate={showStageDetails ? "hide" : "display"}
        >
          <NumItemsInStage>{stageData.length}</NumItemsInStage>
        </NumInStageContainer>
        <StageName>{stageName}</StageName>
      </StageNameAndNumItemsContainer>
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
