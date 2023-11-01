import { useRouteError } from "react-router-dom";
import FloatingHomeButton from "../components/FloatingHomeButton";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";

function ErrorOccurred() {
  let error = useRouteError();
  console.error(error);

  return (
    <>
      <ContentWithTabBar>
        <p>Woah! Something went really wrong :(</p>
        <p>Error: {`${error}`}</p>
      </ContentWithTabBar>
      <FloatingHomeButton />
    </>
  );
}

export default ErrorOccurred;
