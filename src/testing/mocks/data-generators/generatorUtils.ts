import { faker, fakerJA } from "@faker-js/faker";
import { MAX_LEVEL, MIN_LEVEL } from "../../../constants";

export type VoiceActor = {
  voice_actor_id: number;
  voice_actor_name: string;
  voice_description: string;
  gender: string;
};

const ACCENTS = ["Kyoto", "Tokyo"];

export const getRandomLevel = (): number => {
  return faker.number.int({ min: MIN_LEVEL, max: MAX_LEVEL });
};

export const getRandomAccent = (): string => {
  return faker.helpers.arrayElement(ACCENTS);
};

export const getRandomVoiceActorID = (): number => {
  return faker.number.int({ min: 1, max: 5 });
};

export const getRandomVoiceActor = (): VoiceActor => {
  const audioAccent = faker.helpers.arrayElement(ACCENTS);
  return {
    voice_actor_id: getRandomVoiceActorID(),
    voice_actor_name: fakerJA.person.firstName(),
    voice_description: `${audioAccent} accent`,
    gender: faker.person.sex(),
  };
};
