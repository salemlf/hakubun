import { useState, useEffect, ChangeEvent } from "react";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounceValue } from "usehooks-ts";
import { useScrollRestoration } from "use-scroll-restoration";
import { flattenSearchResults } from "../services/MiscService/MiscService";
import { useTabBarHeight } from "../contexts/TabBarHeightContext";
import { useAllSubjects } from "../hooks/subjects/useAllSubjects";
import { useStickyState } from "../hooks/useStickyState";
import { SubjectWideButton } from "../components/SubjectWideBtnList";
import Button from "../components/Button";
import SvgIcon from "../components/SvgIcon";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg?react";
import ThinkingLogo from "../images/logo-thinking.svg";
import QuestionLogo from "../images/logo-question.svg";
import LogoExclamation from "../images/logo-exclamation.svg";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(ContentWithTabBar)`
  padding: 12px 10px;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const ClearButton = styled(Button)`
  border-radius: 10px;
  margin-right: 0.5em;
  padding: 6px;
  border: 1px solid black;

  &:focus-visible {
    outline: 2px solid var(--darkest-purple);
  }
`;

const Form = styled.form`
  margin: 0 5px;
  display: flex;

  &:focus-within,
  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 3px;
  }

  background-color: var(--offwhite-color);
  border-radius: 8px;
  align-items: center;
`;

const SearchBar = styled.input`
  color: var(--darkest-purple);
  &:focus {
    outline: none;
  }
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  padding-left: 3.125em;
  background: var(--offwhite-color) url(${SearchIcon}) no-repeat;
  background-size: 2em;
  background-position: left 0.5em center;
  border: none;
`;

type ListProps = {
  $tabBarHeight: string;
};

const List = styled.ul<ListProps>`
  max-height: 100dvh;
  overflow-y: auto;
  margin: 0;
  padding: 8px 5px;
  padding-bottom: ${({ $tabBarHeight }) => `calc(${$tabBarHeight} + 20px)`};
`;

const LogoSearchOutcomeContainer = styled.div`
  width: 100%;
  padding: 10px 16px;
  text-align: center;

  h2 {
    margin-bottom: 25px;
    width: 100%;
  }
`;

const crabigatorVariants = {
  initial: { opacity: 0 },
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const Search = () => {
  const { ref } = useScrollRestoration("searchPageListScroll", {
    debounceTime: 100,
    persist: "localStorage",
  });
  const [results, setResults] = useState<Fuse.FuseResult<unknown>[]>([]);
  const [query, setQuery] = useStickyState("", "search-page-query");
  const [debouncedQuery] = useDebounceValue(query, 1800);
  const { tabBarHeight } = useTabBarHeight();

  const options = {
    threshold: 0.1,
    distance: 20,
    keys: ["data.slug", "data.meanings.meaning"],
  };

  const {
    isLoading: allSubjectsLoading,
    data: allSubjectsData,
    fetchNextPage,
    hasNextPage,
  } = useAllSubjects();

  const showPlaceholder =
    allSubjectsLoading ||
    (!allSubjectsLoading &&
      (debouncedQuery === "" ||
        (results.length === 0 && debouncedQuery !== "")));

  useEffect(() => {
    if (allSubjectsData) {
      const fuse = new Fuse(
        allSubjectsData as unknown as readonly unknown[],
        options
      );
      const results = fuse.search(debouncedQuery.toLowerCase().trim());
      const flattenedSearch = flattenSearchResults(results);
      setResults(flattenedSearch);
    }
  }, [allSubjectsData, debouncedQuery]);

  useEffect(() => {
    if (allSubjectsData && hasNextPage) {
      fetchNextPage();
    }
  }, [allSubjectsData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Content
      as={motion.main}
      style={
        showPlaceholder ? { alignItems: "center" } : { alignItems: "stretch" }
      }
      layoutScroll
    >
      <Form>
        <SearchBar type="search" value={query} onChange={handleChange} />
        <ClearButton
          backgroundColor="var(--ion-color-primary)"
          onPress={() => setQuery("")}
        >
          <SvgIcon icon={<ClearIcon />} width="1.75em" height="1.75em" />
        </ClearButton>
      </Form>
      <AnimatePresence>
        {allSubjectsLoading ? (
          <LogoSearchOutcomeContainer
            as={motion.div}
            key="loading-placeholder"
            layout
            initial="initial"
            animate="show"
            exit="hide"
            variants={crabigatorVariants}
            transition={{ duration: 0.5 }}
          >
            <h2>Loading...</h2>
            <img src={ThinkingLogo} alt="Crabigator thinking" />
          </LogoSearchOutcomeContainer>
        ) : (
          <>
            {debouncedQuery === "" && (
              <LogoSearchOutcomeContainer
                layout
                key="no-query-placeholder"
                as={motion.div}
                initial="initial"
                animate="show"
                exit="hide"
                variants={crabigatorVariants}
                transition={{ duration: 0.5 }}
              >
                <h2>Try Searching for Something!</h2>
                <img src={QuestionLogo} alt="Confused Crabigator" />
              </LogoSearchOutcomeContainer>
            )}
            {results.length === 0 && debouncedQuery !== "" ? (
              <LogoSearchOutcomeContainer
                key="no-results-placeholder"
                layout
                as={motion.div}
                initial="initial"
                animate="show"
                exit="hide"
                variants={crabigatorVariants}
                transition={{ duration: 0.5 }}
                style={{ alignSelf: "center" }}
              >
                <h2>No Results Found!</h2>
                <img
                  src={LogoExclamation}
                  alt="Unhappy crabigator looking upwards"
                />
              </LogoSearchOutcomeContainer>
            ) : (
              <List
                ref={ref}
                $tabBarHeight={tabBarHeight}
                key="results-found"
                as={motion.div}
                layoutScroll
                initial="initial"
                animate="show"
                exit="hide"
                transition={{ duration: 0.5 }}
              >
                {results.map((subject: any) => (
                  <SubjectWideButton
                    subject={subject}
                    key={subject.id}
                    findImages={true}
                  />
                ))}
              </List>
            )}
          </>
        )}
      </AnimatePresence>
    </Content>
  );
};
