import reactStringReplace from "react-string-replace";

import styles from "./TxtWithSubjTags.module.scss";

// TODO: add rendering for kanjis also
const createSubjectTags = (text: string) => {
  let radRegEx = new RegExp(`<radical>(.+?)<\/radical>`, "g");

  let replaced = reactStringReplace(text, radRegEx, (match, i) => (
    <span key={i} className={`${styles.radicalTag}`}>
      {match}
    </span>
  ));

  return replaced;
};

type Props = {
  mnemonic: string;
};

// TODO: also render links in this component?
export const TxtWithSubjTags = ({ mnemonic }: Props) => {
  return (
    <p className={`${styles.textWithTags}`}>{createSubjectTags(mnemonic)}</p>
  );
};
