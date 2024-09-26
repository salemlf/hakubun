import React, { Fragment } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import { QueueItemAndErr } from "../../stores/useAssignmentSubmitStore/useAssignmentSubmitStore";

const WarningMsg = styled.p`
  margin: 10px 0;
  color: var(--text-color);
`;

const ErrorsContainer = styled.div`
  padding: 10px;
  background-color: var(--secondary-foreground-color);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;

  pre {
    white-space: pre-wrap;

    &::selection {
      background-color: var(--ion-color-primary);
      color: black;
    }

    &::-moz-selection {
      background-color: var(--ion-color-primary);
      color: black;
    }
  }

  hr {
    background-color: #000;
  }
`;

interface ErrorCardProps {
  errorCount: number;
  errors: QueueItemAndErr[];
  type: "review" | "lesson";
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorCount, errors, type }) => {
  return (
    <Card
      title={`Oh no, looks like we weren't able to ${type === "review" ? "submit all your reviews" : "start all your lessons"} for some reason...`}
      headerBgColor="var(--ion-color-danger)"
      headerFontSize="1.25rem"
      headerTextColor="white"
    >
      <WarningMsg>
        {errorCount} {type}
        {errorCount > 1 ? "s" : ""} had errors when{" "}
        {type === "review" ? "submitting" : "starting"}!
      </WarningMsg>
      <ErrorsContainer>
        {errors.map((itemWithErr, idx) => (
          <Fragment key={itemWithErr.queueItem.assignment_id}>
            <pre>
              Error for subject ID {itemWithErr.queueItem.subject_id}:{"\n"}
              {itemWithErr.error}
            </pre>
            {idx >= 0 && idx !== errors.length - 1 && <hr />}
          </Fragment>
        ))}
      </ErrorsContainer>
    </Card>
  );
};

export default ErrorCard;
