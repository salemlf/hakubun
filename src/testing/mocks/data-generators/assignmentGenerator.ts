import { faker } from "@faker-js/faker";
import { ALL_SUBJECT_TYPES, VALID_SRS_STAGES } from "../../../constants";
import { Assignment } from "../../../types/Assignment";

// TODO: use isStarted and change date attributes based on that
export const generateAssignment = (
  isStarted: boolean = false,
  isBurned: boolean = false,
  isResurrected: boolean = false
): Assignment => {
  const mockAssignment: Assignment = {
    id: faker.number.int(),
    object: "assignment",
    created_at: faker.date.past(),
    unlocked_at: faker.date.past(),
    started_at: faker.date.past(),
    passed_at: faker.date.past(),
    burned_at: isBurned ? faker.date.past() : null,
    resurrected_at: isResurrected ? faker.date.past() : null,
    available_at: faker.date.recent(),
    hidden: faker.datatype.boolean(),
    srs_stage: faker.helpers.rangeToNumber({
      min: VALID_SRS_STAGES[0],
      max: VALID_SRS_STAGES[VALID_SRS_STAGES.length - 1],
    }),
    subject_id: faker.number.int(),
    subject_type: faker.helpers.arrayElement(ALL_SUBJECT_TYPES),
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
  };

  return mockAssignment;
};
