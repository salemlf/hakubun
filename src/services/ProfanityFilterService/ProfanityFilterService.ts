import BadWordsNext from "bad-words-next";
import * as en from "bad-words-next/data/en.json";

const badwords = new BadWordsNext({ data: en });

// TODO: filter by other languages too?
export const filterProfanity = (text: string) => {
  return badwords.filter(text);
};
