import * as ToggleGroup from "@radix-ui/react-toggle-group";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { AnimatePresence, motion } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { AssignmentType } from "../../types/Assignment";
import { AssignmentTypeName } from "./AssignmentTypeSelector.types";
import CheckCircleIcon from "../../images/check-in-circle.svg";
import styled from "styled-components";

const AssignmentTypeFieldset = styled.fieldset`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border: none;
  padding-left: 12px;
  gap: 10px;
  margin-bottom: 10px;
`;

type AssignmentTypeLegendProps = {
  headingfontsize: string;
};

const AssignmentTypeLegend = styled.legend<AssignmentTypeLegendProps>`
  /* font-size: 1.25rem; */
  font-size: ${({ headingfontsize }) => headingfontsize};
  color: white;
  padding-top: 0;
  margin-bottom: 8px;
`;

const AssignmentTypeOptions = styled(ToggleGroup.Root)`
  display: flex;
  flex-wrap: wrap;
  padding: 6px 0;
  gap: 12px;
`;

type AssignTypeOptionProps = {
  assigntype: AssignmentType;
};

const AssignmentTypeItem = styled(ToggleGroup.Item)<AssignTypeOptionProps>`
  position: relative;
  background-color: ${({ assigntype }) => getSubjectColor(assigntype)};
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.8rem;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const CheckIconContainer = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Check = styled(IonIcon)`
  width: 2em;
  height: 2em;
`;

type AssignmentTypeSelectorHeadingFontSize = "small" | "large";

const headingFontSizeMap: { [index: string]: string } = {
  small: "1rem",
  large: "1.25rem",
};

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
  headingFontSize: AssignmentTypeSelectorHeadingFontSize;
};

function AssignmentTypeSelector({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  headingFontSize,
}: Props) {
  let headingSize = headingFontSizeMap[headingFontSize];
  console.log(
    "🚀 ~ file: AssignmentTypeSelector.tsx:91 ~ headingSize:",
    headingSize
  );
  return (
    <AssignmentTypeFieldset>
      <AssignmentTypeLegend headingfontsize={headingSize}>
        Subject Types
      </AssignmentTypeLegend>
      <AssignmentTypeOptions
        type="multiple"
        onValueChange={setSelectedAssignmentTypes}
        value={selectedAssignmentTypes}
      >
        {availableAssignmentTypeNames.map(
          (assignmentTypeInfo: AssignmentTypeName) => {
            return (
              <AssignmentTypeItem
                key={assignmentTypeInfo.name}
                assigntype={assignmentTypeInfo.name}
                value={assignmentTypeInfo.name}
              >
                {assignmentTypeInfo.displayName}
                <AnimatePresence>
                  {selectedAssignmentTypes.includes(
                    assignmentTypeInfo.name
                  ) && (
                    <CheckIconContainer
                      transition={{
                        type: "spring",
                        duration: 0.75,
                        bounce: 0.5,
                      }}
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <Check className="checkmark" src={CheckCircleIcon} />
                    </CheckIconContainer>
                  )}
                </AnimatePresence>
              </AssignmentTypeItem>
            );
          }
        )}
      </AssignmentTypeOptions>
    </AssignmentTypeFieldset>
  );
}

export default AssignmentTypeSelector;
