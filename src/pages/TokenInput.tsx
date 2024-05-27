import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthTokenStoreFacade from "../stores/useAuthTokenStore/useAuthTokenStore.facade";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import useUserSettingsStoreFacade from "../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { useUserLogin } from "../hooks/user/useUserLogin";
import { AccordionItemData } from "../types/MiscTypes";
import LoadingDots from "../components/LoadingDots";
import Button from "../components/Button";
import HelpSpan from "../components/HelpSpan";
import FallingText from "../components/FallingText";
import Emoji from "../components/Emoji";
import Accordion from "../components/Accordion";
import SvgIcon from "../components/SvgIcon";
import WavesBgImgLight from "../images/layered-waves-bg-light.svg";
import WavesBgImgDark from "../images/layered-waves-bg-dark.svg";
import LogoIcon from "../images/logo.svg?react";
import OpenEyeIcon from "../images/open-eye.svg?react";
import CrossedOutEyeIcon from "../images/crossed-out-eye.svg?react";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

type ContentProps = {
  $bgimg: string;
};

const Content = styled(MainContent)<ContentProps>`
  height: 100%;
  padding: 20px 15px;
  background-color: var(--background-color);
  background-image: ${({ $bgimg }) => `url("${$bgimg}")`};
  background-size: cover;

  background-repeat: no-repeat;
  background-position: bottom;
`;

const TokenInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  margin: 0px;
  padding: 0px;
  width: 100%;
  outline: none;
  border-radius: 5px;
  border: none;

  &:autofill,
  &:-internal-autofill-selected,
  &:-internal-autofill-previewed,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    background-color: white;
    color: black;
    box-shadow: 0 0 0 30px white inset;
    -webkit-background-clip: text;
    -webkit-box-shadow: 0 0 0 30px white inset;
    -webkit-text-fill-color: black;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const SubmitButton = styled(Button)`
  padding: 10px;
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 10px;
  border: 1px solid black;
`;

const InputContainer = styled.div`
  background-color: var(--foreground-color);
  padding: 16px 12px;
  border-radius: 10px;
`;

const HelpContentParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
`;

// TODO: display error icon
const ErrorTxt = styled.p`
  margin-bottom: 0;
`;

const HeadingAndLogoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 10px 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  all: unset;
  line-height: 1.5;
`;

const List = styled.ol`
  padding-inline-start: 30px;
  li:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const TokenAndBtnContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  max-width: 500px;
  padding: 5px;
  background-color: white;

  &:focus-within,
  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }

  color: black;
  margin: 10px 0;
  border-radius: 5px;
`;

const ShowHideButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 5px;
  margin-left: 10px;

  &:focus-visible {
    outline: 2px solid black;
    outline-offset: 1px;
  }
`;

const accordionItems: AccordionItemData[] = [
  {
    value: "help-info",
    title: (
      <Title>
        Erm I'm confused, how do I use this app?{" "}
        <Emoji symbol="😵‍💫" label="confused, spiral eyes face" />
      </Title>
    ),
    content: (
      <div>
        <p>
          Hakubun is meant to be used with{" "}
          <a href="https://www.wanikani.com/" target="_blank" rel="noopener">
            Wanikani
          </a>
          , a Japanese language learning tool. To use this app, you'll need to
          do the following:
        </p>
        <List>
          <li>
            Create a Wanikani account{" "}
            <em>
              (the first three levels are free, no credit card info needed)
            </em>
          </li>
          <li>
            Navigate to your{" "}
            <a
              rel="noopener"
              href="https://www.wanikani.com/settings/personal_access_tokens"
              target="_blank"
            >
              API tokens page
            </a>{" "}
            and create a Wanikani API token with all permissions allowed
          </li>
          <li>Enter your API token above </li>
          <li>
            Start studying! <Emoji symbol="🥳" label="partying face" />
          </li>
        </List>
      </div>
    ),
  },
];

// TODO: change so bg image is set for page content instead of page
const TokenInput = () => {
  const navigate = useNavigate();
  const { login } = useUserLogin();
  const [hasError, setHasError] = useState(false);
  const [tokenPageLoading, setTokenPageLoading] = useState(false);
  const { isAuthLoading, authToken, isAuthenticated } =
    useAuthTokenStoreFacade();
  const { userInfo } = useUserInfoStoreFacade();
  const [bgImg, setBgImg] = useState<string>(WavesBgImgLight);
  const { prefersDarkModeTheme } = useUserSettingsStoreFacade();
  const [isTokenShown, setIsTokenShown] = useState<boolean>(false);

  useEffect(() => {
    if (prefersDarkModeTheme) {
      setBgImg(WavesBgImgDark);
    } else {
      setBgImg(WavesBgImgLight);
    }
  }, [prefersDarkModeTheme]);

  // logs user in if auth info already in storage
  useEffect(() => {
    if (authToken) {
      setAuth(authToken);
    }

    if (prefersDarkModeTheme) {
      setBgImg(WavesBgImgDark);
    } else {
      setBgImg(WavesBgImgLight);
    }
  }, []);

  useEffect(() => {
    if (userInfo !== undefined && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const apiToken = formData.get("api-token");
    if (apiToken === "") {
      // TODO: show a toast
      console.log("Hey, you need to enter a token!");
    }
    if (apiToken) {
      setAuth(apiToken.toString());
    }
  };

  const setAuth = async (token: string) => {
    setTokenPageLoading(true);
    let success = await login(token);

    if (success) {
      console.log("Successfully logged in!");
      setHasError(false);
    } else {
      setTokenPageLoading(false);
      setHasError(true);
    }
  };

  const HelpPopoverContents = (
    <HelpContentParagraph>
      You can find this on your{" "}
      <a
        rel="noopener"
        href="https://www.wanikani.com/settings/personal_access_tokens"
        target="_blank"
      >
        API tokens page
      </a>
      , make sure to allow all permissions
    </HelpContentParagraph>
  );

  return (
    <>
      {!isAuthLoading && !tokenPageLoading ? (
        <Content $bgimg={bgImg}>
          <HeadingAndLogoContainer>
            <LogoContainer>
              <SvgIcon icon={<LogoIcon />} width="100%" height="25vh" />
            </LogoContainer>
            <FallingText text="Hakubun" delay={0.5} duration={0.25} />
          </HeadingAndLogoContainer>
          <p>
            A <em>(third-party)</em> Japanese Study App for Wanikani
          </p>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <TokenInputLabel htmlFor="api-token-input">
                <HelpSpan helpPopoverContents={HelpPopoverContents}>
                  Wanikani API Token
                </HelpSpan>
                <TokenAndBtnContainer>
                  <Input
                    id="api-token-input"
                    data-testid="token-input"
                    type={isTokenShown ? "text" : "password"}
                    name="api-token"
                    data-private
                    data-sentry-mask
                  />
                  <ShowHideButton
                    onPress={() => setIsTokenShown(!isTokenShown)}
                  >
                    <SvgIcon
                      icon={
                        isTokenShown ? <CrossedOutEyeIcon /> : <OpenEyeIcon />
                      }
                      width="1.5em"
                      height="1.5em"
                    />
                  </ShowHideButton>
                </TokenAndBtnContainer>
              </TokenInputLabel>
              {hasError && (
                <ErrorTxt>
                  Oh no! An error occurred retrieving your info, please make
                  sure your API token is correct
                </ErrorTxt>
              )}
            </InputContainer>
            <ButtonRow>
              <SubmitButton
                aria-label="Submit token"
                type="submit"
                backgroundColor="var(--ion-color-tertiary)"
                color="black"
                style={{ fontSize: "1.25rem" }}
              >
                Let's Study!
              </SubmitButton>
            </ButtonRow>
          </form>
          <Accordion items={accordionItems} />
        </Content>
      ) : (
        <FixedCenterContainer>
          <LoadingDots />
        </FixedCenterContainer>
      )}
    </>
  );
};

export default TokenInput;
