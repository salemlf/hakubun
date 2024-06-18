import { useEffect, useRef, useState } from "react";
import { useUserFeedbackSubmit } from "./UserFeedbackModal.hooks";
import Modal from "../Modal";
import HelpSpan from "../HelpSpan";
import Label from "../Label";
import Switch from "../Switch";
import LoadingDots from "../LoadingDots";
import SvgIcon from "../SvgIcon";
import SendIcon from "../../images/paper-airplane.svg?react";
import {
  ButtonContainer,
  FeedbackInfoLabel,
  FeedbackTextArea,
  FieldContainer,
  LoadingDotsContainer,
  MarginlessParagraph,
  SubmitButton,
  SwitchFieldContainer,
} from "./UserFeedbackModal";
import styled from "styled-components";

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

interface FormElements extends HTMLFormControlsCollection {
  errInfoTextarea: HTMLTextAreaElement;
}

interface ErrReportForm extends HTMLFormElement {
  readonly elements: FormElements;
}

export type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  errMsg: string;
  stackTrace?: string;
};

const formDefaults = {
  isUserNameIncluded: false,
  isDeviceInfoIncluded: false,
};

function ErrReportModal({ isOpen, setIsOpen, errMsg, stackTrace }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isUsernameIncluded, setIsUsernameIncluded] = useState<boolean>(
    formDefaults.isUserNameIncluded
  );
  const [isDeviceInfoIncluded, setIsDeviceInfoIncluded] = useState<boolean>(
    formDefaults.isDeviceInfoIncluded
  );

  const onSubmitSuccess = () => {
    setIsOpen(false);
    setIsUsernameIncluded(formDefaults.isUserNameIncluded);
    setIsDeviceInfoIncluded(formDefaults.isDeviceInfoIncluded);
  };

  const { isReportSubmitting, createAndPostIssue, setIsReportSubmitting } =
    useUserFeedbackSubmit(onSubmitSuccess);

  // bails out of submitting issue if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsReportSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (textareaRef.current) {
      isOpen ? textareaRef.current.focus() : textareaRef.current.blur();
    }
  }, [isOpen]);

  const submitErrReport = async (event: React.ChangeEvent<ErrReportForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements.errInfoTextarea;
    const errInfoTextareaValue = target.value;

    const errInfo = `## Error\n### Error Message\n\`${errMsg}\`\n### Stack Trace\n\`\`\`\n${stackTrace} \n\`\`\`\n`;

    createAndPostIssue({
      title: errMsg,
      issueType: "bug",
      description: errInfoTextareaValue,
      isUsernameIncluded,
      isDeviceInfoIncluded,
      errInfo,
    });
  };

  return (
    <>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content
          modalID="err-report-modal"
          title="Send Error Report"
          isOpen={isOpen}
          delayOpenClose={true}
          description="The error report will be sent to the developer. It'll include the error message, stack trace, and any additional info you provide."
        >
          <form onSubmit={submitErrReport}>
            <FieldContainer>
              <FeedbackInfoLabel htmlFor="errInfoTextarea">
                <HelpSpan helpPopoverContents={AddtlErrHelpPopoverContents}>
                  <span>What caused the error to occur?</span>
                </HelpSpan>
                <FeedbackTextArea
                  id="errInfoTextarea"
                  ref={textareaRef}
                  aria-label={`Error Details`}
                />
              </FeedbackInfoLabel>
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
