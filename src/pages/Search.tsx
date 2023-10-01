import { useState, useEffect } from "react";
import { IonList, IonSearchbar } from "@ionic/react";
import Fuse from "fuse.js";
import { flattenSearchResults } from "../services/MiscService";
import { useAllSubjects } from "../hooks/useAllSubjects";
import { useHideOnKeyboardOpen } from "../hooks/useHideOnKeyboardOpen";
import { SubjectWideButton } from "../components/SubjectWideBtnList";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg";
import ThinkingLogo from "../images/logo-thinking.svg";
import QuestionLogo from "../images/logo-question.svg";
import LogoExclamation from "../images/logo-exclamation.svg";
import {
  AbsoluteCenterContainer,
  ContentWithTabBar,
  FixedCenterContainer,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const SearchBar = styled(IonSearchbar)`
  --background: var(--offwhite-color);
  --color: var(--darkest-purple);
  --placeholder-color: var(--light-greyish-purple);
  --icon-color: var(--darkest-purple);
  --clear-button-color: var(--dark-greyish-purple);
`;

const List = styled(IonList)`
  --background: none;
  background: none;
  margin: 0 8px;
  padding: 8px 5px;
`;

const LogoSearchOutcomeContainer = styled(AbsoluteCenterContainer)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px;
  text-align: center;

  h2 {
    margin-bottom: 25px;
    width: 100%;
  }
`;

// TODO: improve animate presence delay/changes
export const Search = () => {
  let [results, setResults] = useState<Fuse.FuseResult<unknown>[]>([]);
  const [query, setQuery] = useState("");
  // const { shouldHide } = useHideOnKeyboardOpen();

  const options = {
    threshold: 0.1,
    distance: 20,
    keys: ["data.slug", "data.meanings.meaning"],
  };

  const {
    isLoading: allSubjectsLoading,
    data: allSubjectsData,
    error: allSubjectsErr,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllSubjects();

  useEffect(() => {
    if (allSubjectsData) {
      const fuse = new Fuse(
        allSubjectsData as unknown as readonly unknown[],
        options
      );
      const results = fuse.search(query);
      let flattenedSearch = flattenSearchResults(results);
      setResults(flattenedSearch);
    }
  }, [allSubjectsData, query]);

  useEffect(() => {
    if (allSubjectsData && hasNextPage) {
      fetchNextPage();
    }
  }, [allSubjectsData]);

  const handleInput = (ev: Event) => {
    let enteredQuery = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) enteredQuery = target.value!.toLowerCase();

    setQuery(enteredQuery);
  };

  return (
    <>
      <Page>
        <ContentWithTabBar>
          <SearchBar
            debounce={1800}
            searchIcon={SearchIcon}
            clearIcon={ClearIcon}
            onIonInput={(ev) => handleInput(ev)}
          ></SearchBar>
          <AnimatePresence>
            {query === "" && !allSubjectsLoading && (
              <LogoSearchOutcomeContainer
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2>Try Searching for Something!</h2>
                <img src={QuestionLogo} />
              </LogoSearchOutcomeContainer>
            )}
          </AnimatePresence>
          {!allSubjectsLoading ? (
            results.length === 0 && query !== "" ? (
              <LogoSearchOutcomeContainer
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2>No Results Found!</h2>
                <img src={LogoExclamation} />
              </LogoSearchOutcomeContainer>
            ) : (
              <List>
                {results.map((subject: any) => (
                  <SubjectWideButton
                    subject={subject}
                    key={subject.id}
                    findImages={true}
                  />
                ))}
              </List>
            )
          ) : (
            <LogoSearchOutcomeContainer
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2>Loading...</h2>
              <img src={ThinkingLogo} />
            </LogoSearchOutcomeContainer>
          )}
        </ContentWithTabBar>
        {/* {!shouldHide && <FloatingTabBar />} */}
        <FloatingTabBar />
      </Page>
    </>
  );
};
