import { useRouteError } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";
import FloatingHomeButton from "../components/FloatingHomeButton";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

function ErrorOccurred() {
  let error = useRouteError();
  console.error(error);

  return (
    <>
      <Page>
        <ContentWithTabBar>
          <p>Woah! Something went really wrong :(</p>
          <p>Error: {`${error}`}</p>
        </ContentWithTabBar>
        <FloatingHomeButton />
      </Page>
    </>
  );
}

export default ErrorOccurred;
