import { useState, useEffect } from "react";
import { IonList, IonSearchbar } from "@ionic/react";
import Fuse from "fuse.js";
import { flattenSearchResults } from "../services/MiscService";
import { useAllSubjects } from "../hooks/useAllSubjects";
import { SubjectWideButton } from "../components/SubjectWideBtnList";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import styled from "styled-components";

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

export const Search = () => {
  let [results, setResults] = useState<Fuse.FuseResult<unknown>[]>([]);
  const [query, setQuery] = useState("");

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
    <Page>
      <ContentWithTabBar>
        <SearchBar
          debounce={1800}
          searchIcon={SearchIcon}
          clearIcon={ClearIcon}
          onIonInput={(ev) => handleInput(ev)}
        ></SearchBar>
        {!allSubjectsLoading ? (
          <List>
            {results.map((subject: any) => (
              <SubjectWideButton
                subject={subject}
                key={subject.id}
                findImages={true}
              />
            ))}
          </List>
        ) : (
          <p>Loading...</p>
        )}
      </ContentWithTabBar>
    </Page>
  );
};
