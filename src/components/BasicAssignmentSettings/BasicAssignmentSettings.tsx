import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import { useAssignmentSettingsCtxStore } from "../../stores/useAssignmentSettingsCtxStore/useAssignmentSettingsCtxStore";
import { Assignment } from "../../types/Assignment";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { SubjectType } from "../../types/Subject";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import SortOrderOption from "../SortOrderOption";
import BackToBackOption from "../BackToBackOption";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

type Props = {
  assignmentData: Assignment[];
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: SubjectType[];
  setSelectedAssignmentTypes: (assignmentTypesSelected: SubjectType[]) => void;
  showBackToBackOption: boolean;
};

function BasicAssignmentSettings({
  assignmentData,
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  showBackToBackOption,
}: Props) {
  const defaultBatchSize = useAssignmentSettingsCtxStore((s) => s.batchSize);
  const setBatchSize = useAssignmentSettingsCtxStore((s) => s.setBatchSize);
  const sortOption = useAssignmentSettingsCtxStore((s) => s.sortOption);
  const setSortOption = useAssignmentSettingsCtxStore((s) => s.setSortOption);
  const backToBackChoice = useAssignmentSettingsCtxStore(
    (s) => s.backToBackChoice
  );
  const setBackToBackChoice = useAssignmentSettingsCtxStore(
    (s) => s.setBackToBackChoice
  );

  const availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter((batchSize) => {
    return Number.parseInt(batchSize)
      ? Number.parseInt(batchSize) <= assignmentData.length
      : true;
  });

  const availBatchSizesStr = availBatchSizes as string[];

  const batchSizeWithoutAll = availBatchSizes.filter((batchSize) => {
    return batchSize !== "All";
  });

  const batchSizeNumbers = batchSizeWithoutAll.map((batchSize) => {
    return Number.parseInt(batchSize);
  });

  const defaultBatchSizeNum =
    defaultBatchSize === "All"
      ? assignmentData.length
      : parseInt(defaultBatchSize);
  const selectedBatchSize = (
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
          onBatchSizeChange={setBatchSize}
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
            headingFontSize="large"
            backToBackChoice={backToBackChoice}
            setBackToBackChoice={setBackToBackChoice}
          />
        </SettingOptionContainer>
      )}
    </Card>
  );
}

export default BasicAssignmentSettings;
