import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentSortOption } from "../SortOrderOption/SortOrderOption.types";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
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
  availableAssignmentTypeNames: AssignmentTypeName[];
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
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  sortOption,
  setSortOption,
}: Props) {
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
      <SettingOptionContainer>
        <AssignmentTypeSelector
          headingFontSize="large"
          selectedAssignmentTypes={selectedAssignmentTypes}
          availableAssignmentTypeNames={availableAssignmentTypeNames}
          setSelectedAssignmentTypes={setSelectedAssignmentTypes}
        />
      </SettingOptionContainer>
    </Card>
  );
}

export default BasicAssignmentSettings;
