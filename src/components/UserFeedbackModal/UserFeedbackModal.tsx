import { useEffect, useRef, useState } from "react";
import { useUserFeedbackSubmit } from "./UserFeedbackModal.hooks";
import { IssueType } from "../../types/Octokit";
import Switch from "../Switch";
import Label from "../Label";
import Modal from "../Modal";
import HelpSpan from "../HelpSpan";
import SvgIcon from "../SvgIcon";
import Button from "../Button";
import LoadingDots from "../LoadingDots";
import Selector, { SelectItem } from "../Selector";
import SendIcon from "../../images/paper-airplane.svg?react";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

export const LoadingDotsContainer = styled(FixedCenterContainer)`
  z-index: 5000;
`;

export const FeedbackInfoLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-weight: 600;
  }
`;

export const FeedbackTextArea = styled.textarea`
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

export const FieldContainer = styled.div`
  margin-bottom: 16px;
`;

export const SwitchFieldContainer = styled(FieldContainer)`
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: auto auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid black;
`;

export const MarginlessParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const BtnTxt = styled.p`
  margin: 0;
`;

const TitleInput = styled.input`
  background-color: white;
  color: black;
  margin: 0px;
  width: 100%;
  border-radius: 5px;
`;

const AddtlErrHelpPopoverContents = (
  <MarginlessParagraph>
    Give a detailed explanation of the feature, bug, or question you have.{" "}
    <strong>
      Please don't enter confidential info, this will be a public GitHub issue.
    </strong>
  </MarginlessParagraph>
);

const SubjectInputPopoverContents = (
  <MarginlessParagraph>
    A brief title to describe the bug, feature, or question you're submitting
  </MarginlessParagraph>
);

interface FormElements extends HTMLFormControlsCollection {
  feedbackDescriptionTextarea: HTMLTextAreaElement;
  feedbackTitleInput: HTMLInputElement;
}

interface FeedbackForm extends HTMLFormElement {
  readonly elements: FormElements;
}

type FeedbackTypeSelection = {
  value: IssueType;
  label: string;
  descriptionInputLabel: string;
};
const feedbackTypeSelections: FeedbackTypeSelection[] = [
  {
    value: "enhancement",
    label: "Feature Request",
    descriptionInputLabel: "Describe the feature you'd like to see added",
  },
  {
    value: "bug",
    label: "Bug Report",
    descriptionInputLabel: "What caused the bug to show up?",
  },
  {
    value: "question",
    label: "Question",
    descriptionInputLabel: "Elaborate on your question a bit",
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function UserFeedbackModal({ isOpen, setIsOpen }: Props) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isUsernameIncluded, setIsUsernameIncluded] = useState<boolean>(false);
  const [isDeviceInfoIncluded, setIsDeviceInfoIncluded] =
    useState<boolean>(false);
  const { isReportSubmitting, createAndPostIssue, setIsReportSubmitting } =
    useUserFeedbackSubmit(setIsOpen);
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackTypeSelection>(feedbackTypeSelections[0]);

  // bails out of submitting issue if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsReportSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const updateFeedbackTypeSelection = (updatedValue: string) => {
    const selected =
      feedbackTypeSelections.find(
        (feedbackType) => feedbackType.value === updatedValue
      ) ?? feedbackTypeSelections[0];

    setSelectedFeedbackType(selected);
  };

  const submitFeedback = async (event: React.ChangeEvent<FeedbackForm>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const descriptionTextareaValue =
      formElements.feedbackDescriptionTextarea.value;
    const titleInputValue = formElements.feedbackTitleInput.value;

    const issueToCreate = {
      title: titleInputValue,
      issueType: selectedFeedbackType.value,
      description: descriptionTextareaValue,
      isUsernameIncluded,
      isDeviceInfoIncluded,
    };

    createAndPostIssue(issueToCreate);
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Content
        modalID="user-feedback-modal"
        title="Send User Feedback"
        isOpen={isOpen}
        description="This info will be sent to the developer. You can ask a question, suggest a feature, or report a bug!"
      >
        <form onSubmit={submitFeedback}>
          <FieldContainer>
            <Label
              labelText="Type of feedback"
              idOfControl="feedbackTypeSelector"
              labelfontSize="1rem"
              isBold={true}
            />
            <Selector
              id="feedbackTypeSelector"
              value={selectedFeedbackType?.value}
              onValueChange={(updatedValue) =>
                updateFeedbackTypeSelection(updatedValue)
              }
            >
              {feedbackTypeSelections.map((feedbackType) => {
                return (
                  <SelectItem
                    key={`feedbackItem_${feedbackType.value}`}
                    value={feedbackType.value}
                  >
                    {feedbackType.label}
                  </SelectItem>
                );
              })}
            </Selector>
          </FieldContainer>
          <FieldContainer>
            <FeedbackInfoLabel htmlFor="feedbackTitleInput">
              <HelpSpan helpPopoverContents={SubjectInputPopoverContents}>
                <span>Title</span>
              </HelpSpan>
              <TitleInput
                id="feedbackTitleInput"
                aria-label="User feedback title"
                ref={titleInputRef}
                required
              />
            </FeedbackInfoLabel>
          </FieldContainer>
          <FieldContainer>
            <FeedbackInfoLabel htmlFor="feedbackDescriptionTextarea">
              <HelpSpan helpPopoverContents={AddtlErrHelpPopoverContents}>
                <span>{selectedFeedbackType.descriptionInputLabel}</span>
              </HelpSpan>
              <FeedbackTextArea
                id="feedbackDescriptionTextarea"
                aria-label={`User Feedback`}
                required
              />
            </FeedbackInfoLabel>
          </FieldContainer>
          <SwitchFieldContainer>
            <Label
              labelText="Include username in feedback?"
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
          {selectedFeedbackType.value === "bug" && (
            <SwitchFieldContainer>
              <Label
                labelText="Include device OS and platform?"
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
          )}
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
  );
}

export default UserFeedbackModal;
