export type IssueType = "bug" | "enhancement" | "question";

export type IssuePostData = {
  title: string;
  body: string;
  issueType: IssueType;
};

// there's lots more properties in the response, but we only care about these for now
export type GitHubIssue = {
  id: number;
  url: string;
  user: unknown;
  html_url: string;
  labels: unknown[];
  reactions: unknown;
};

export type OctokitResponseStatusCode = number;
