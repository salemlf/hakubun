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

const Heading = styled.h1`
  color: var(--darkest-purple);
`;

const OhNoMessage = styled.p`
  font-size: 1rem;
  margin: 12px 0;
  color: var(--darkest-purple);
`;

function NotFound() {
  return (
    <>
      <Header bgcolor="var(--ion-color-warning)">
        <Heading>404</Heading>
        <OhNoMessage>
          Oh no, 404!{" "}
          <Emoji symbol="🧐" label="inquisitive face with monocle" />
        </OhNoMessage>
      </Header>
      <Content>
        <ErrorDetails>
          <p>Looks like we can't find that page!</p>
        </ErrorDetails>
        <DistressedCrabigatorContainer>
          <img src={LogoExclamation} />
        </DistressedCrabigatorContainer>
      </Content>
      <FloatingHomeButton />
    </>
  );
}

export default NotFound;
