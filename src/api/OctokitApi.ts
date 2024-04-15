import { Octokit } from "@octokit/rest";
import { IssuePostData } from "../types/Octokit";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_USER_FEEDBACK_PAT,
});

// TODO: Add error handling
export async function createIssue({ title, body, issueType }: IssuePostData) {
  const response = await octokit.rest.issues.create({
    owner: "salemlf",
    repo: "hakubun",
    title,
    body,
    labels: [issueType],
  });

  return response;
}
