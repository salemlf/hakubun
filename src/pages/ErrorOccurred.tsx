import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { copyToClipboard } from "../utils";
import Emoji from "../components/Emoji";
import Button from "../components/Button";
import SvgIcon from "../components/SvgIcon";
import ErrReportModal from "../components/UserFeedbackModal/ErrReportModal";
import LogoExclamation from "../images/logo-exclamation.svg";
import CopyIcon from "../images/copy.svg?react";
import ColorHomeIcon from "../images/home-color.svg?react";
import ErrorIcon from "../images/error.svg?react";
import { FloatingButton, Header } from "../styles/BaseStyledComponents";
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

const StackTraceAppVersionContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const BtnTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

const FloatingButtonsContainer = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 35px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

type Props = {
  error: Error;
};

function ErrorOccurred({ error }: Props) {
  const navigate = useNavigate();
  const [isErrReportModalOpen, setIsErrReportModalOpen] = useState(false);

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
            <h3>{error.message}</h3>
            <CopyContentBtn
              onPress={() =>
                copyToClipboard(
                  `${APP_VERSION}\n${error.message}\n${error.stack}`
                )
              }
            >
              Copy Error{" "}
              <SvgIcon icon={<CopyIcon />} width="1.5em" height="1.5em" />
            </CopyContentBtn>
          </ErrAndCopyBtnContainer>
          <StackTraceAppVersionContainer>
            <h4>App Version</h4>
            <p>{APP_VERSION}</p>
            <h4>Stacktrace</h4>
            {error.stack && <p>{error.stack}</p>}
          </StackTraceAppVersionContainer>
        </ErrorDetails>
        <DistressedCrabigatorContainer>
          <img src={LogoExclamation} alt="Unhappy crabigator looking upwards" />
        </DistressedCrabigatorContainer>
      </Content>
      <ErrReportModal
        isOpen={isErrReportModalOpen}
        setIsOpen={setIsErrReportModalOpen}
        errMsg={error.message}
        stackTrace={error.stack}
      />
      <FloatingButtonsContainer>
        <FloatingButton
          backgroundColor="var(--ion-color-warning)"
          color="black"
          onPress={() => setIsErrReportModalOpen(true)}
        >
          <SvgIcon icon={<ErrorIcon />} width="1.5em" height="1.5em" />
          <BtnTxt>Report Error</BtnTxt>
        </FloatingButton>
        <FloatingButton
          backgroundColor="var(--ion-color-tertiary)"
          color="black"
          onPress={() => navigate({ to: "/", replace: true })}
        >
          <SvgIcon icon={<ColorHomeIcon />} width="1.5em" height="1.5em" />
          <BtnTxt>Home</BtnTxt>
        </FloatingButton>
      </FloatingButtonsContainer>
    </>
  );
}

export default ErrorOccurred;
