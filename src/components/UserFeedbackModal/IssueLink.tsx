import { MarginlessParagraph } from "./UserFeedbackModal";

export type IssueLinkProps = {
  url: string;
  issueTerm: string;
};

export const IssueLink = ({ url, issueTerm }: IssueLinkProps) => {
  return (
    <MarginlessParagraph>
      You can view your {issueTerm}{" "}
      <a target="_blank" href={url}>
        here
      </a>
    </MarginlessParagraph>
  );
};
