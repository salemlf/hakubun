import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { copyToClipboard } from "../utils";
import { RELEASE_VERSION } from "../App";
import FloatingHomeButton from "../components/FloatingHomeButton";
import Emoji from "../components/Emoji";
import Button from "../components/Button";
import SvgIcon from "../components/SvgIcon";
import LogoExclamation from "../images/logo-exclamation.svg";
import CopyIcon from "../images/copy.svg?react";
import { Header } from "../styles/BaseStyledComponents";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(ContentWithTabBar)`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  height: 100%;
`;

const DistressedCrabigatorContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  margin-bottom: 100px;
  justify-content: center;

  img {
    max-height: 300px;
  }
`;

const ErrorDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-foreground-color);
  border-radius: 8px;

  h3,
  h4,
  p {
    margin: 0;
    width: 100%;
    white-space: pre-line;
  }

  p {
    margin-bottom: 10px;
  }

  h3,
  h4 {
    font-weight: 600;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1rem;
    margin: 5px 0;
  }
`;

const OhNoMessage = styled.p`
  font-size: 1rem;
  margin: 12px 0;
`;

const CopyContentBtn = styled(Button)`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid black;
  gap: 4px;
  font-size: 0.875rem;
`;

const ErrAndCopyBtnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

function ErrorOccurred() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  let stackTrace: string | undefined;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = `Response error: ${error.data?.message || error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    stackTrace = error.stack;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = `Unknown error occurred: ${JSON.stringify(error)}`;
  }

  return (
    <>
      <Header bgcolor="var(--ion-color-danger-tint)">
        <h1>ERROR</h1>
        <OhNoMessage>
          Woah! Something went really wrong{" "}
          <Emoji
            symbol="😨"
            label="scared, raised eyebrows and frowning face with open mouth"
          />
        </OhNoMessage>
      </Header>
      <Content>
        <ErrorDetails>
          <ErrAndCopyBtnContainer>
            <h3>{errorMessage}</h3>
            <CopyContentBtn
              onPress={() =>
                copyToClipboard(
                  `${RELEASE_VERSION}\n${errorMessage}\n${stackTrace}`
                )
              }
            >
              Copy Error{" "}
              <SvgIcon icon={<CopyIcon />} width="1.5em" height="1.5em" />
            </CopyContentBtn>
          </ErrAndCopyBtnContainer>
          <h4>App Version</h4>
          <p>{RELEASE_VERSION}</p>
          <h4>Stacktrace</h4>
          {stackTrace && <p>{stackTrace}</p>}
        </ErrorDetails>
        <DistressedCrabigatorContainer>
          <img src={LogoExclamation} alt="Unhappy crabigator looking upwards" />
        </DistressedCrabigatorContainer>
      </Content>
      <FloatingHomeButton />
    </>
  );
}

export default ErrorOccurred;
