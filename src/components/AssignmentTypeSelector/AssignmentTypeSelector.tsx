import * as ToggleGroup from "@radix-ui/react-toggle-group";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { AnimatePresence, motion } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { getSettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.service";
import { AssignmentTypeName } from "./AssignmentTypeSelector.types";
import { SettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.types";
import { SubjectType } from "../../types/Subject";
import CheckCircleIcon from "../../images/check-in-circle.svg";
import styled from "styled-components";

const AssignmentTypeFieldset = styled.fieldset`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border: none;
  padding-left: 12px;
  gap: 10px;
  margin: 0;
  padding: 0;
`;

type AssignmentTypeLegendProps = {
  headingfontsize: string;
};

const AssignmentTypeLegend = styled.legend<AssignmentTypeLegendProps>`
  font-size: ${({ headingfontsize }) => headingfontsize};
  color: var(--text-color);
  padding-top: 0;
  margin-bottom: 8px;
`;

const AssignmentTypeOptions = styled(ToggleGroup.Root)`
  display: flex;
  flex-wrap: wrap;
  padding: 6px 2px;
  gap: 12px;
`;

type AssignTypeOptionProps = {
  assigntype: SubjectType;
};

const AssignmentTypeItem = styled(ToggleGroup.Item)<AssignTypeOptionProps>`
  position: relative;
  background-color: ${({ assigntype }) => getSubjectColor(assigntype)};
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.8rem;
  color: white;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
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

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: SubjectType[];
  setSelectedAssignmentTypes: (assignmentTypesSelected: SubjectType[]) => void;
  headingFontSize: SettingHeadingFontSize;
};

function AssignmentTypeSelector({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  headingFontSize,
}: Props) {
  let headingSize = getSettingHeadingFontSize(headingFontSize);

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
