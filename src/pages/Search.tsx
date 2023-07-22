import { useMemo, useState, useEffect } from "react";
import { IonContent, IonList, IonPage, IonSearchbar } from "@ionic/react";
import Fuse from "fuse.js";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg";
import styled from "styled-components/macro";
import { useAllSubjects } from "../hooks/subjects/useAllSubjects";
import { Subject } from "../types/Subject";
import { SubjectWideButton } from "../components/SubjectWideBtnList";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
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
`;

// TODO: move searchbar so it's right above keyboard/at bottom of screen
// TODO: paginate search results
export const Search = () => {
  let [results, setResults] = useState<Fuse.FuseResult<unknown>[]>([]);
  const [query, setQuery] = useState("");

  const options = {
    threshold: 0.1,
    distance: 20,
    keys: ["slug", "meanings.meaning"],
  };

  const {
    isLoading: allSubjectsLoading,
    data: allSubjectsData,
    error: allSubjectsErr,
  } = useAllSubjects();

  useEffect(() => {
    if (allSubjectsData) {
      const fuse = new Fuse(allSubjectsData, options);
      const results = fuse.search(query);
      setResults(results);
    }
  }, [allSubjectsData, query]);

  const handleInput = (ev: Event) => {
    let enteredQuery = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) enteredQuery = target.value!.toLowerCase();

    setQuery(enteredQuery);
  };

  return (
    <Page>
      <>
        <IonContent>
          <>
            <SearchBar
              debounce={1500}
              searchIcon={SearchIcon}
              clearIcon={ClearIcon}
              onIonInput={(ev) => handleInput(ev)}
            ></SearchBar>
          </>
          {!allSubjectsLoading ? (
            <List>
              {results.map((subject: any) => (
                <SubjectWideButton
                  subject={subject.item}
                  key={subject.item.id}
                  findImages={true}
                />
              ))}
            </List>
          ) : (
            <p>Loading...</p>
          )}
        </IonContent>
      </>
    </Page>
  );
};
