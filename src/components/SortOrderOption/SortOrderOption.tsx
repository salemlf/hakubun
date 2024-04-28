import { getSortOrderOptionById } from "./SortOrderOption.service";
import { SORT_OPTIONS } from "./SortOrderOption.constants";
import { AssignmentSortOption } from "./SortOrderOption.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  labelId?: string;
  sortOption: AssignmentSortOption;
  setSortOption: (sortOption: AssignmentSortOption) => void;
};

function SortOrderOption({
  sortOption,
  setSortOption,
  labelId = "sort-option-selector",
}: Props) {
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
