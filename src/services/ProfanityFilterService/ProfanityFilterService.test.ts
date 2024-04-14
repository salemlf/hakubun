import { filterProfanity } from "./ProfanityFilterService";

test("filterProfanity - profanity is filtered out", () => {
  const textWithProfanity = "Well ain't that some shit, damn!";
  const expectedResult = textWithProfanity.replace(/shit,|damn!/g, "***");

  const filtered = filterProfanity(textWithProfanity);
  expect(filtered).toEqual(expectedResult);
});
