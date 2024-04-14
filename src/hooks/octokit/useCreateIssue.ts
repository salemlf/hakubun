import { useMutation } from "@tanstack/react-query";
import { IssuePostData } from "../../types/Octokit";
import { createIssue } from "../../api/OctokitApi";

type Props = {
  issuePostData: IssuePostData;
};

export const useCreateIssue = () => {
  return useMutation({
    mutationFn: ({ issuePostData }: Props) => createIssue(issuePostData),
  });
};
