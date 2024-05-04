import { useState } from "react";
import { Device } from "@capacitor/device";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { displayToast } from "../Toast/Toast.service";
import { filterProfanity } from "../../services/ProfanityFilterService/ProfanityFilterService";
import { useCreateIssue } from "../../hooks/octokit/useCreateIssue";
import { IssuePostData, IssueType } from "../../types/Octokit";
import { RELEASE_VERSION } from "../../App";
import { IssueLink } from "./IssueLink";

type IssueBodyDetail = {
  bodyHeading: string;
  term: string;
  descriptionHeading: string;
};

const issueTypeBodyDetails: Record<IssueType, IssueBodyDetail> = {
  bug: {
    bodyHeading: "Bug/Error Report",
    term: "bug report",
    descriptionHeading: "What Caused the Bug/Error to Show Up?",
  },
  enhancement: {
    bodyHeading: "Feature Request",
    term: "feature request",
    descriptionHeading: "Describe the Feature You'd Like to See Added",
  },
  question: {
    bodyHeading: "Question",
    term: "question",
    descriptionHeading: "Elaborate on Your Question a Bit",
  },
};

type CreateAndPostIssueParams = {
  title: string;
  issueType: IssueType;
  description: string;
  isUsernameIncluded: boolean;
  isDeviceInfoIncluded?: boolean;
  errInfo?: string;
};

export const useUserFeedbackSubmit = (onSubmitSuccess: () => void) => {
  const [isReportSubmitting, setIsReportSubmitting] = useState<boolean>(false);
  const { mutateAsync: createGitHubIssue } = useCreateIssue();
  const { userInfo } = useUserInfoStoreFacade();

  const getDeviceDebugInfo = async () => {
    const deviceInfo = await Device.getInfo();
    const { name, memUsed, realDiskFree, realDiskTotal, ...infoForDebugging } =
      deviceInfo;

    return JSON.stringify(infoForDebugging, null, "\t");
  };

  const createAndPostIssue = async ({
    title,
    issueType,
    isUsernameIncluded,
    description,
    isDeviceInfoIncluded = false,
    errInfo,
  }: CreateAndPostIssueParams) => {
    const username =
      isUsernameIncluded && userInfo?.username
        ? userInfo.username
        : "Anonymous User";

    const deviceInfo = isDeviceInfoIncluded
      ? await getDeviceDebugInfo()
      : "No device info provided";

    const bodyDetails = issueTypeBodyDetails[issueType];

    // it's not that I don't trust y'all.. but also don't want my hakubun issue bot account banned lol
    const titleFiltered = filterProfanity(title);
    const descriptionFiltered = filterProfanity(description);
    const descriptionAndOptionalData = `# ${bodyDetails.bodyHeading}\n## ${bodyDetails.descriptionHeading}\n${descriptionFiltered}\n## Additional Info\n### Release Version\n${RELEASE_VERSION}\n### Issue Created By\n${username}`;

    const deviceInfoTxt = `\n### Device Info\n\`\`\`\n${deviceInfo}\n\`\`\`\n`;

    const body =
      issueType === "bug"
        ? `${errInfo ?? ""}${descriptionAndOptionalData}${deviceInfoTxt}`
        : `${descriptionAndOptionalData}`;

    const issueInfo: IssuePostData = {
      title: titleFiltered,
      body,
      issueType: issueType,
    };
    setIsReportSubmitting(true);

    createGitHubIssue({ issuePostData: issueInfo })
      .then((response) => {
        if (response.status > 299) {
          displayToast({
            toastType: "error",
            title: "Oh no, an API Error!",
            content: `There was an issue submitting your ${bodyDetails.term} to the Hakubun project (oh, the irony).\nResponded with status code: ${response.status}. Maybe try again later?`,
            timeout: 10000,
          });
        } else {
          onSubmitSuccess();
          displayToast({
            toastType: "success",
            title: `Your ${bodyDetails.term} has been submitted!`,
            content: (
              <IssueLink
                url={response.data.html_url}
                issueTerm={bodyDetails.term}
              />
            ),
            timeout: 10000,
          });
        }
        setIsReportSubmitting(false);
      })
      .catch((err) => {
        displayToast({
          toastType: "error",
          title: "Oh no, an API Error!",
          content: `There was an issue submitting your ${bodyDetails.term} (oh, the irony)\n Error: ${err}`,
          timeout: 10000,
        });
        setIsReportSubmitting(false);
      });
  };

  return { isReportSubmitting, createAndPostIssue, setIsReportSubmitting };
};
