import { Octokit } from "@octokit/rest";

export type GitHubIssueType = "bug" | "enhancement" | "question";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_USER_FEEDBACK_PAT,
});

// TODO: Add error handling
export async function createIssue(
  title: string,
  body: string,
  issueType: GitHubIssueType
) {
  const response = await octokit.rest.issues.create({
    owner: "salemlf",
    repo: "hakubun",
    title,
    body,
    labels: [issueType],
  });

  return response.data;
}
