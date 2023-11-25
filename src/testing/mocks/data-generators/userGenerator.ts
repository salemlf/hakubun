import { faker } from "@faker-js/faker";
import {
  LessonsPresentationOrder,
  ReviewsPresentationOrder,
  User,
  UserResponse,
} from "../../../types/User";
import { getRandomLevel, getRandomVoiceActor } from "./generatorUtils";
import { U } from "vitest/dist/reporters-5f784f42.js";
import { userEndpoint } from "../../endpoints";

const LESSONS_PRESENTATION_ORDER_OPTIONS: LessonsPresentationOrder[] = [
  "ascending_level_then_subject",
  "shuffled",
  "ascending_level_then_shuffled",
];

const REVIEWS_PRESENTATION_ORDER_OPTIONS: ReviewsPresentationOrder[] = [
  "shuffled",
  "lower_levels_first",
];

const BATCH_SIZES = [1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

type UserGeneratorParams = {
  level: number;
  isOnVacation?: boolean;
};

// TODO: add params for other subscription types, user preferences
export const generateUser = ({
  level,
  isOnVacation = false,
}: UserGeneratorParams): User => {
  const voiceActor = getRandomVoiceActor();
  const lessonsPresentationOrder = faker.helpers.arrayElement(
    LESSONS_PRESENTATION_ORDER_OPTIONS
  );
  const reviewsPresentationOrder = faker.helpers.arrayElement(
    REVIEWS_PRESENTATION_ORDER_OPTIONS
  );

  const lessonBatchSize = faker.helpers.arrayElement(BATCH_SIZES);

  const user: User = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    level: level ?? getRandomLevel(),
    profile_url: faker.internet.url(),
    started_at: faker.date.past(),
    current_vacation_started_at: isOnVacation ? faker.date.recent() : null,
    subscription: {
      active: true,
      type: "recurring",
      max_level_granted: 60,
      period_ends_at: faker.date.future(),
    },
    preferences: {
      default_voice_actor_id: voiceActor.voice_actor_id,
      extra_study_autoplay_audio: faker.datatype.boolean(),
      lessons_autoplay_audio: faker.datatype.boolean(),
      lessons_batch_size: lessonBatchSize,
      lessons_presentation_order: lessonsPresentationOrder,
      reviews_autoplay_audio: faker.datatype.boolean(),
      reviews_display_srs_indicator: faker.datatype.boolean(),
      reviews_presentation_order: reviewsPresentationOrder,
    },
  };
  return user;
};

export const generateUserResponse = ({
  level,
  isOnVacation = false,
}: UserGeneratorParams): UserResponse => {
  const user = generateUser({ level, isOnVacation });
  const userResponse: UserResponse = {
    object: "user",
    url: userEndpoint,
    data_updated_at: faker.date.past(),
    data: user,
  };

  return userResponse;
};
