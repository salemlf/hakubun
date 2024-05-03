import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import ErrorIcon from "../../images/error.svg?react";
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
    line-height: 1.875;
  }
`;

export const FeedbackTextArea = styled.textarea`
  width: 100%;
  border-radius: 5px;
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

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }
`;

export const FieldContainer = styled.div`
  margin-bottom: 16px;
`;

const TypeOfFeedbackContainer = styled(FieldContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const SwitchFieldContainer = styled(FieldContainer)`
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: auto auto;
  justify-content: space-between;
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

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }
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

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }
`;

const RequiredFieldContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  background-color: white;
  border-radius: 5px;
  margin-top: 5px;
`;

const RequiredFieldMsg = styled.p`
  font-size: 0.75rem;
  color: var(--ion-color-danger);
  margin: 0;
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

type FormInputs = {
  feedbackDescription: string;
  feedbackTitle: string;
};

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

const formDefaults = {
  isUserNameIncluded: false,
  isDeviceInfoIncluded: false,
  selectedFeedbackType: feedbackTypeSelections[0],
};
type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function UserFeedbackModal({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const [isUsernameIncluded, setIsUsernameIncluded] = useState<boolean>(
    formDefaults.isUserNameIncluded
  );
  const [isDeviceInfoIncluded, setIsDeviceInfoIncluded] = useState<boolean>(
    formDefaults.isDeviceInfoIncluded
  );
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackTypeSelection>(formDefaults.selectedFeedbackType);

  const resetForm = () => {
    reset();
    setIsUsernameIncluded(formDefaults.isUserNameIncluded);
    setIsDeviceInfoIncluded(formDefaults.isDeviceInfoIncluded);
    setSelectedFeedbackType(formDefaults.selectedFeedbackType);
  };

  const onSubmitSuccess = () => {
    setIsOpen(false);
    resetForm();
  };

  const feedbackTypeSelectorRef = useRef<HTMLButtonElement>(null);

  const { isReportSubmitting, createAndPostIssue, setIsReportSubmitting } =
    useUserFeedbackSubmit(onSubmitSuccess);

  // bails out of submitting issue if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsReportSubmitting(false);
    }
  }, [isOpen, setIsReportSubmitting]);

  useEffect(() => {
    if (isOpen && feedbackTypeSelectorRef.current) {
      feedbackTypeSelectorRef.current.focus();
    }
  }, [isOpen]);

  const updateFeedbackTypeSelection = (updatedValue: string) => {
    const selected =
      feedbackTypeSelections.find(
        (feedbackType) => feedbackType.value === updatedValue
      ) ?? feedbackTypeSelections[0];

    setSelectedFeedbackType(selected);
  };

  const submitFeedback: SubmitHandler<FormInputs> = (data) => {
    const feedbackDescriptionValue = data.feedbackDescription;
    const feedbackTitleValue = data.feedbackTitle;

    const issueToCreate = {
      title: feedbackTitleValue,
      issueType: selectedFeedbackType.value,
      description: feedbackDescriptionValue,
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
        <form noValidate onSubmit={handleSubmit(submitFeedback)}>
          <TypeOfFeedbackContainer>
            <Label
              labelText="Type of feedback"
              idOfControl="feedbackTypeSelector"
              labelfontSize="1rem"
              isBold={true}
            />
            <Selector
              ref={feedbackTypeSelectorRef}
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
          </TypeOfFeedbackContainer>
          <FieldContainer>
            <FeedbackInfoLabel htmlFor="feedbackTitleInput">
              <HelpSpan
                helpPopoverContents={SubjectInputPopoverContents}
                isBold={true}
              >
                <span>Title</span>
              </HelpSpan>
              <TitleInput
                {...register("feedbackTitle", { required: true })}
                id="feedbackTitleInput"
                aria-label="User feedback title"
              />
            </FeedbackInfoLabel>
            {errors.feedbackTitle && (
              <RequiredFieldContainer>
                <SvgIcon icon={<ErrorIcon />} width="1.25em" height="1.25em" />
                <RequiredFieldMsg>This field is required</RequiredFieldMsg>
              </RequiredFieldContainer>
            )}
          </FieldContainer>
          <FieldContainer>
            <FeedbackInfoLabel htmlFor="feedbackDescriptionTextarea">
              <HelpSpan
                helpPopoverContents={AddtlErrHelpPopoverContents}
                isBold={true}
              >
                <span>{selectedFeedbackType.descriptionInputLabel}</span>
              </HelpSpan>
              <FeedbackTextArea
                {...register("feedbackDescription", { required: true })}
                id="feedbackDescriptionTextarea"
                aria-label={`User Feedback`}
              />
            </FeedbackInfoLabel>
            {errors.feedbackDescription && (
              <RequiredFieldContainer>
                <SvgIcon icon={<ErrorIcon />} width="1.25em" height="1.25em" />
                <RequiredFieldMsg>This field is required</RequiredFieldMsg>
              </RequiredFieldContainer>
            )}
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
