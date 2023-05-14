import { SubjAndAssignment } from "../types/MiscTypes";

const convertToUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getSubjectDisplayName = (subj: SubjAndAssignment) => {
  let subjType = subj["object"];

  if (subjType == "radical") {
    return convertToUpperCase(subj["slug" as keyof {}]);
  } else {
    let primary = subj["meanings"]?.filter(
      (meaning: any) => meaning.primary === true
    );

    console.log(
      "🚀 ~ file: getSubjectDisplayName.tsx:46 ~ getSubjectDisplayName ~ primary:",
      primary
    );

    return primary[0].meaning;
  }
};
