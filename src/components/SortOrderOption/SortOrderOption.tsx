import { useState } from "react";
import { SORT_OPTIONS } from "./constants";
import { AssignmentSortOption } from "./types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

type Props = {
  sortOption: AssignmentSortOption;
  onSortUpdate: (sortOption: AssignmentSortOption) => void;
};

function SortOrderOption({ sortOption, onSortUpdate }: Props) {
  console.log(
    "🚀 ~ file: SortOrderOption.tsx:14 ~ SortOrderOption ~ sortOption:",
    sortOption
  );
  return (
    <SettingOptionContainer>
      <Label labelText="Sort Order" idOfControl="sort-option-selector" />
      <Selector
        id="sort-option-selector"
        value={sortOption}
        onValueChange={(updatedValue) =>
          onSortUpdate(updatedValue as AssignmentSortOption)
        }
      >
        {SORT_OPTIONS.map((option: string) => {
          return (
            <SelectItem key={`batch_${option}`} value={option}>
              {option}
            </SelectItem>
          );
        })}
      </Selector>
    </SettingOptionContainer>
  );
}

export default SortOrderOption;
