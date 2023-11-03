import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import FloatingHomeButton from "../components/FloatingHomeButton";
import Emoji from "../components/Emoji";
import LogoExclamation from "../images/logo-exclamation.svg";
import { Header } from "../styles/BaseStyledComponents";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(ContentWithTabBar)`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
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
`;

const OhNoMessage = styled.p`
  font-size: 1rem;
  margin: 12px 0;
`;

function ErrorOccurred() {
  let error = useRouteError();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = `Response error: ${error.data?.message || error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
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
          <p>{`${error}`}</p>
        </ErrorDetails>
        <DistressedCrabigatorContainer>
          <img src={LogoExclamation} />
        </DistressedCrabigatorContainer>
      </Content>
      <FloatingHomeButton />
    </>
  );
}

export default ErrorOccurred;
