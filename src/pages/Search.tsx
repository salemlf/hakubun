import { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
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

// TODO: move searchbar so it's right above keyboard/at bottom of screen
export const Search = () => {
  // const [searchInput, setSearchInput] = useState("");
  const data = [
    "Amsterdam",
    "Buenos Aires",
    "Cairo",
    "Geneva",
    "Hong Kong",
    "Istanbul",
    "London",
    "Madrid",
    "New York",
    "Panama City",
  ];
  let [results, setResults] = useState<Subject[]>([]);

  const {
    isLoading: allSubjectsLoading,
    data: allSubjectsData,
    error: allSubjectsErr,
  } = useAllSubjects();

  // TODO: change to search by meaning, not slug
  // TODO: change to use Fuse js
  const handleInput = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      allSubjectsData.filter(
        (subject: Subject) => subject.slug.toLowerCase().indexOf(query) > -1
      )
    );
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
              placeholder="Search Icon"
              onIonInput={(ev) => handleInput(ev)}
            ></SearchBar>
          </>
          {!allSubjectsLoading ? (
            <IonList>
              {results.map((subject: Subject) => (
                <SubjectWideButton subject={subject} key={subject.id} />
              ))}
            </IonList>
          ) : (
            <p>Loading...</p>
          )}
        </IonContent>
      </>
    </Page>
  );
};
