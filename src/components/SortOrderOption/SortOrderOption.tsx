import { getSortOrderOptionById } from "./SortOrderOption.service";
import { SORT_OPTIONS } from "./SortOrderOption.constants";
import { useAssignmentSettingsCtxStore } from "../../stores/useAssignmentSettingsCtxStore/useAssignmentSettingsCtxStore";
import { AssignmentSortOption } from "./SortOrderOption.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  labelId?: string;
};

function SortOrderOption({ labelId = "sort-option-selector" }: Props) {
  const sortOption = useAssignmentSettingsCtxStore((s) => s.sortOption);
  const setSortOption = useAssignmentSettingsCtxStore((s) => s.setSortOption);

  const onSortUpdate = (sortOptionId: string) => {
    const option = getSortOrderOptionById(sortOptionId);
    setSortOption(option);
  };

  return (
    <>
      <Label labelText="Sort Order" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={sortOption.id}
        onValueChange={(updatedValue) => onSortUpdate(updatedValue)}
      >
        {SORT_OPTIONS.map((option: AssignmentSortOption) => {
          return (
            <SelectItem key={`batch_${option.id}`} value={option.id}>
              {`${option.option}${
                option.id !== "shuffled" ? ", " + option.order : ""
              }`}
            </SelectItem>
          );
        })}
      </Selector>
    </>
  );
}

export default SortOrderOption;
