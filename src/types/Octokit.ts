export type IssueType = "bug" | "enhancement" | "question";

export type IssuePostData = {
  title: string;
  body: string;
  issueType: IssueType;
};
