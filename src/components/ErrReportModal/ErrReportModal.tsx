import { useEffect, useRef, useState } from "react";
import { Device } from "@capacitor/device";
import { RELEASE_VERSION } from "../../App";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { filterProfanity } from "../../services/ProfanityFilterService/ProfanityFilterService";
import { displayToast } from "../Toast/Toast.service";
import { useCreateIssue } from "../../hooks/octokit/useCreateIssue";
import { IssuePostData } from "../../types/Octokit";
import Button from "../Button";
import Modal from "../Modal";
import HelpSpan from "../HelpSpan";
import Label from "../Label";
import Switch from "../Switch";
import LoadingDots from "../LoadingDots";
import SvgIcon from "../SvgIcon";
import SendIcon from "../../images/paper-airplane.svg?react";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const LoadingDotsContainer = styled(FixedCenterContainer)`
  z-index: 5000;
`;

const AddtlErrInfoLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-weight: 600;
  }
`;

const ErrInfoTextArea = styled.textarea`
  width: 100%;
  display: inline-flex;
  color: black;
  background-color: white;
  flex: 1;

  &::selection {
    background-color: var(--ion-color-primary);
    color: black;
  }

  &::-moz-selection {
    background-color: var(--ion-color-primary);
    color: black;
  }
`;

const FieldContainer = styled.div`
  margin-bottom: 16px;
`;

const SwitchFieldContainer = styled(FieldContainer)`
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: auto auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid black;
`;

const MarginlessParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const BtnTxt = styled.p`
  margin: 0;
`;

const AddtlErrHelpPopoverContents = (
  <MarginlessParagraph>
    What were you doing when the error occurred?{" "}
    <strong>This is optional,</strong> but recommended as it helps resolve the
    issue faster!{" "}
    <strong>
      Please don't enter confidential info, this will be a public GitHub issue.
    </strong>
  </MarginlessParagraph>
);

type IssueLinkProps = {
  url: string;
};

const IssueLink = ({ url }: IssueLinkProps) => {
  return (
    <MarginlessParagraph>
      You can view your error report{" "}
      <a target="_blank" href={url}>
        here
      </a>
    </MarginlessParagraph>
  );
};

const getDeviceDebugInfo = async () => {
  const deviceInfo = await Device.getInfo();
  const { name, memUsed, realDiskFree, realDiskTotal, ...infoForDebugging } =
    deviceInfo;

  return JSON.stringify(infoForDebugging, null, "\t");
};

interface FormElements extends HTMLFormControlsCollection {
  errInfoTextarea: HTMLTextAreaElement;
}

interface ErrReportForm extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  errMsg: string;
  stackTrace?: string;
};

function ErrReportModal({ isOpen, setIsOpen, errMsg, stackTrace }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isReportSubmitting, setIsReportSubmitting] = useState<boolean>(false);
  const [isUsernameIncluded, setIsUsernameIncluded] = useState<boolean>(false);
  const [isDeviceInfoIncluded, setIsDeviceInfoIncluded] =
    useState<boolean>(false);
  const { userInfo } = useUserInfoStoreFacade();

  // bails out of submitting issue if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsReportSubmitting(false);
    }
  }, [isOpen]);

  const { mutateAsync: createGitHubIssue } = useCreateIssue();

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const submitErrReport = async (event: React.ChangeEvent<ErrReportForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements.errInfoTextarea;
    const errInfoTextareaValue = target.value;
    const username =
      isUsernameIncluded && userInfo?.username
        ? userInfo.username
        : "Anonymous User";

    const deviceInfo = isDeviceInfoIncluded
      ? await getDeviceDebugInfo()
      : "No device info provided";

    // it's not that I don't trust y'all.. but also don't want my hakubun issue bot account banned lol
    const filteredErrInfoValue = filterProfanity(errInfoTextareaValue);
    const issueBody = `## Error\n### Error Message\n\`${errMsg}\`\n### Stack Trace\n\`\`\`\n${stackTrace} \n\`\`\`\n## Description from User\n${filteredErrInfoValue}\n## Additional Info\n### Release Version\n${RELEASE_VERSION}\n### Device Info\n\`\`\`\n${deviceInfo}\n\`\`\`\n### Bug Reported By\n${username}`;

    const issueInfo: IssuePostData = {
      title: errMsg,
      body: issueBody,
      issueType: "bug",
    };
    setIsReportSubmitting(true);

    createGitHubIssue({ issuePostData: issueInfo })
      .then((response) => {
        if (response.status > 299) {
          displayToast({
            toastType: "error",
            title: "Oh no, an API Error!",
            content: `There was an issue submitting your error report (oh, the irony).\nResponded with status code: ${response.status}`,
            timeout: 10000,
          });
        } else {
          setIsOpen(false);
          displayToast({
            toastType: "success",
            title: "Your error report has been submitted!",
            content: <IssueLink url={response.data.html_url} />,
            timeout: 10000,
          });
        }
        setIsReportSubmitting(false);
      })
      .catch((err) => {
        displayToast({
          toastType: "error",
          title: "Oh no, an API Error!",
          content: `There was an issue submitting your error report (oh, the irony)\n Error: ${err}`,
          timeout: 10000,
        });
        setIsReportSubmitting(false);
      });
  };

  return (
    <>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content
          modalID="err-report-modal"
          title="Send Error Report"
          isOpen={isOpen}
          description="The error report will be sent to the developer. It'll include the error message, stack trace, and any additional info you provide."
        >
          <form onSubmit={submitErrReport}>
            <FieldContainer>
              <AddtlErrInfoLabel htmlFor="errInfoTextarea">
                <HelpSpan helpPopoverContents={AddtlErrHelpPopoverContents}>
                  <span>What caused the error to occur?</span>
                </HelpSpan>
                <ErrInfoTextArea
                  id="errInfoTextarea"
                  ref={textareaRef}
                  aria-label={`Error Details`}
                />
              </AddtlErrInfoLabel>
            </FieldContainer>
            <SwitchFieldContainer>
              <Label
                labelText="Include Username in Report?"
                idOfControl="includeUsernameSwitch"
                labelfontSize="1rem"
                isBold={true}
              />
              <Switch
                isSwitchedOn={isUsernameIncluded}
                setIsSwitchedOn={setIsUsernameIncluded}
                labelId="includeUsernameSwitch"
                size="medium"
                showText={true}
              />
            </SwitchFieldContainer>
            <SwitchFieldContainer>
              <Label
                labelText="Include Device OS and platform?"
                idOfControl="includeDeviceInfoSwitch"
                labelfontSize="1rem"
                isBold={true}
              />
              <Switch
                isSwitchedOn={isDeviceInfoIncluded}
                setIsSwitchedOn={setIsDeviceInfoIncluded}
                labelId="includeDeviceInfoSwitch"
                size="medium"
                showText={true}
              />
            </SwitchFieldContainer>
            <ButtonContainer>
              <SubmitButton
                type="submit"
                backgroundColor="var(--ion-color-tertiary)"
                color="black"
                disabled={isReportSubmitting}
              >
                <SvgIcon icon={<SendIcon />} width="1.75em" height="1.75em" />
                <BtnTxt>{isReportSubmitting ? "Sending..." : "Send"}</BtnTxt>
              </SubmitButton>
            </ButtonContainer>
          </form>
          {isReportSubmitting && (
            <LoadingDotsContainer>
              <LoadingDots />
            </LoadingDotsContainer>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ErrReportModal;
