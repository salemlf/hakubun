import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentSortOption } from "../SortOrderOption/SortOrderOption.types";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import SortOrderOption from "../SortOrderOption";
import BackToBackOption from "../BackToBackOption";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

// TODO: change so this isn't using so many props
type Props = {
  assignmentData: Assignment[];
  defaultBatchSize: string;
  setBatchSize: (size: string) => void;
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
  sortOption: AssignmentSortOption;
  setSortOption: (sortOption: AssignmentSortOption) => void;
  showBackToBackOption: boolean;
  backToBackChoice: BackToBackChoice;
  setBackToBackChoice: (choice: BackToBackChoice) => void;
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
  showBackToBackOption,
  backToBackChoice,
  setBackToBackChoice,
}: Props) {
  let availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter((batchSize) => {
    return Number.parseInt(batchSize)
      ? Number.parseInt(batchSize) <= assignmentData.length
      : true;
  });

  let availBatchSizesStr = availBatchSizes as string[];

  let batchSizeWithoutAll = availBatchSizes.filter((batchSize) => {
    return batchSize !== "All";
  });

  let batchSizeNumbers = batchSizeWithoutAll.map((batchSize) => {
    return Number.parseInt(batchSize);
  });

  let defaultBatchSizeNum =
    defaultBatchSize === "All"
      ? assignmentData.length
      : parseInt(defaultBatchSize);
  let selectedBatchSize = (
    defaultBatchSizeNum <= assignmentData.length
      ? defaultBatchSize
      : Math.max(...batchSizeNumbers)
  ) as string;

  return (
    <Card>
      <SettingOptionContainer>
        <BatchSizeOption
          availableSizes={availBatchSizesStr}
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
      {showBackToBackOption && (
        <SettingOptionContainer>
          <BackToBackOption
            backToBackChoice={backToBackChoice}
            onBackToBackChoiceChange={setBackToBackChoice}
            headingFontSize="large"
          />
        </SettingOptionContainer>
      )}
    </Card>
  );
}

export default BasicAssignmentSettings;
