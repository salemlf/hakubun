import { getSubjectTypeDisplayText } from "../../services/SubjectAndAssignmentService";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentSortOption } from "../SortOrderOption/SortOrderOption.types";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import SortOrderOption from "../SortOrderOption";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

// TODO: change so this isn't using so many props
type Props = {
  assignmentData: Assignment[];
  defaultBatchSize: number;
  setBatchSize: (size: number) => void;
  availableAssignmentTypes: AssignmentType[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
  sortOption: AssignmentSortOption;
  setSortOption: (sortOption: AssignmentSortOption) => void;
};

function BasicAssignmentSettings({
  assignmentData,
  defaultBatchSize,
  setBatchSize,
  availableAssignmentTypes,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  sortOption,
  setSortOption,
}: Props) {
  const availableAssignmentTypeNames = availableAssignmentTypes.map(
    (assignmentType) => {
      return {
        name: assignmentType,
        displayName: getSubjectTypeDisplayText(
          assignmentType,
          assignmentType === "radical"
        ),
      };
    }
  );

  let availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter(
    (batchSize) => batchSize <= assignmentData.length
  );
  let selectedBatchSize =
    defaultBatchSize <= assignmentData.length
      ? defaultBatchSize
      : Math.max(...availBatchSizes);

  return (
    <Card>
      <SettingOptionContainer>
        <BatchSizeOption
          availableSizes={availBatchSizes}
          batchSize={selectedBatchSize}
          onBatchSizeChange={(updatedBatchSize) =>
            setBatchSize(updatedBatchSize)
          }
        />
      </SettingOptionContainer>
      <SettingOptionContainer>
        <SortOrderOption
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </SettingOptionContainer>
      <AssignmentTypeSelector
        selectedAssignmentTypes={selectedAssignmentTypes}
        availableAssignmentTypeNames={availableAssignmentTypeNames}
        setSelectedAssignmentTypes={setSelectedAssignmentTypes}
      />
    </Card>
  );
}

export default BasicAssignmentSettings;
