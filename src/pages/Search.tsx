import { useState, useEffect, ChangeEvent } from "react";
import { IonList } from "@ionic/react";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "usehooks-ts";
import { flattenSearchResults } from "../services/MiscService";
import { useAllSubjects } from "../hooks/useAllSubjects";
import { useStickyState } from "../hooks/useStickyState";
import { SubjectWideButton } from "../components/SubjectWideBtnList";
import Button from "../components/Button";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg?react";
import ThinkingLogo from "../images/logo-thinking.svg";
import QuestionLogo from "../images/logo-question.svg";
import LogoExclamation from "../images/logo-exclamation.svg";
import {
  AbsoluteCenterContainer,
  ContentWithTabBar,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";
import SvgIcon from "../components/SvgIcon";

const Content = styled(ContentWithTabBar)`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const ClearButton = styled(Button)`
  border-radius: 10px;
  margin-right: 0.5em;
  padding: 6px;

  &:focus-visible {
    outline: 2px solid var(--darkest-purple);
  }
`;

const Form = styled.form`
  display: flex;
  &:focus-within {
    outline: 2px solid white;
    outline-offset: 3px;
  }

  &:focus-visible {
    outline: 2px solid white;
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

const List = styled(IonList)`
  --background: none;
  background: none;
  margin: 0;
  padding: 8px 0;
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

const crabigatorVariants = {
  initial: { opacity: 0 },
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const Search = () => {
  let [results, setResults] = useState<Fuse.FuseResult<unknown>[]>([]);
  const [query, setQuery] = useStickyState("", "search-page-query");
  const debouncedQuery = useDebounce<string>(query, 1800);

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
      const results = fuse.search(debouncedQuery);
      let flattenedSearch = flattenSearchResults(results);
      setResults(flattenedSearch);
    }
  }, [allSubjectsData, debouncedQuery]);

  useEffect(() => {
    if (allSubjectsData && hasNextPage) {
      fetchNextPage();
    }
  }, [allSubjectsData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase().trim());
  };

  return (
    <>
      <Content>
        <Form>
          <SearchBar type="search" value={query} onChange={handleChange} />
          <ClearButton onPress={() => setQuery("")}>
            <SvgIcon icon={<ClearIcon />} width="1.75em" height="1.75em" />
          </ClearButton>
        </Form>
        <AnimatePresence>
          {debouncedQuery === "" && !allSubjectsLoading && (
            <LogoSearchOutcomeContainer
              as={motion.div}
              initial="initial"
              animate="show"
              exit="hide"
              variants={crabigatorVariants}
              transition={{ duration: 0.5 }}
            >
              <h2>Try Searching for Something!</h2>
              <img src={QuestionLogo} />
            </LogoSearchOutcomeContainer>
          )}
        </AnimatePresence>
        {!allSubjectsLoading ? (
          results.length === 0 && debouncedQuery !== "" ? (
            <LogoSearchOutcomeContainer
              as={motion.div}
              initial="initial"
              animate="show"
              exit="hide"
              variants={crabigatorVariants}
              transition={{ duration: 0.5 }}
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
            initial="initial"
            animate="show"
            exit="hide"
            variants={crabigatorVariants}
            transition={{ duration: 0.5 }}
          >
            <h2>Loading...</h2>
            <img src={ThinkingLogo} />
          </LogoSearchOutcomeContainer>
        )}
      </Content>
    </>
  );
};
