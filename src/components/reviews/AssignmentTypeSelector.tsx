import { useToggle } from "../../hooks/useToggle";
import {
  getAssignmentTypeDisplayText,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService";

import styled from "styled-components";
import { AssignmentType } from "../../types/Assignment";

type AssignTypeOptionProps = {
  assignType: AssignmentType;
};

// TODO: update styles so bg color is duller if not checked
// TODO: hide/disable if subject type not in currently available assignments
const AssignTypeOption = styled.label<AssignTypeOptionProps>`
  color: white;
  border-radius: 10px;
  padding: 8px;
  background-color: ${({ assignType }) => getSubjectColor(assignType)};

  display: flex;
  gap: 8px;
  align-items: center;

  &--disabled {
    color: var(--form-control-disabled);
    cursor: not-allowed;
  }

  /* below checkbox styles are adapted from Stephanie Eckles' tutorial: https://moderncss.dev/pure-css-custom-checkbox-style/*/
  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--form-background);
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-radius: 5px;
    transform: translateY(-0.075rem);

    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65rem;
    height: 0.65rem;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:focus {
    outline: max(2px, 0.1rem) solid currentColor;
    outline-offset: max(2px, 0.1rem);
  }

  input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);

    color: var(--form-control-disabled);
    cursor: not-allowed;
  }
`;

type AssignmentTypeCheckboxProps = {
  assignmentType: AssignmentType;
  isChecked: boolean;
  onCheckValueChange: () => void;
  pluralize?: boolean;
};

const AssignmentTypeCheckbox = ({
  assignmentType,
  isChecked,
  onCheckValueChange,
  pluralize = false,
}: AssignmentTypeCheckboxProps) => {
  let displayTxt = getAssignmentTypeDisplayText(assignmentType, pluralize);

  return (
    <AssignTypeOption htmlFor={assignmentType} assignType={assignmentType}>
      {displayTxt}
      <input
        id={assignmentType}
        type="checkbox"
        name={assignmentType}
        value={assignmentType}
        checked={isChecked}
        onChange={onCheckValueChange}
      />
    </AssignTypeOption>
  );
};

const AssignmentTypeFieldset = styled.fieldset`
  border: none;
  padding-left: 12px;
  display: flex;
  gap: 10px;
`;

const AssignmentTypeLegend = styled.legend`
  font-size: 1rem;
  color: white;
  padding-top: 0;
  margin-bottom: 5px;
`;

type AssignTypeSelectorProps = {
  onSelectedAssignTypeChange: (assignmentTypeUpdated: AssignmentType) => void;
};

// TODO: change to receive assignments available for review data, then can disable or hide assignment types not in reviews
export const AssignmentTypeSelector = ({
  onSelectedAssignTypeChange,
}: AssignTypeSelectorProps) => {
  const [radicalsSelected, toggleRadicalsSelected] = useToggle(true);
  const [kanjiSelected, toggleKanjiSelected] = useToggle(true);
  const [vocabSelected, toggleVocabSelected] = useToggle(true);

  const updateSelectedAssignTypes = (
    assignmentTypeUpdated: AssignmentType,
    toggleFunc: () => void
  ) => {
    toggleFunc();
    onSelectedAssignTypeChange(assignmentTypeUpdated);
  };
  // TODO: pass data with filtered assignments to parent when button is clicked in parent

  return (
    <AssignmentTypeFieldset>
      <AssignmentTypeLegend>Subject Types</AssignmentTypeLegend>
      <AssignmentTypeCheckbox
        assignmentType="radical"
        isChecked={radicalsSelected}
        onCheckValueChange={() =>
          updateSelectedAssignTypes(
            "radical" as AssignmentType,
            toggleRadicalsSelected
          )
        }
        pluralize={true}
      />
      <AssignmentTypeCheckbox
        assignmentType="kanji"
        isChecked={kanjiSelected}
        onCheckValueChange={() =>
          updateSelectedAssignTypes(
            "kanji" as AssignmentType,
            toggleKanjiSelected
          )
        }
      />
      <AssignmentTypeCheckbox
        assignmentType="vocabulary"
        isChecked={vocabSelected}
        onCheckValueChange={() =>
          updateSelectedAssignTypes(
            "vocabulary" as AssignmentType,
            toggleVocabSelected
          )
        }
      />
    </AssignmentTypeFieldset>
  );
};
