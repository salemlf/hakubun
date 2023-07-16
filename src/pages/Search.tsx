import { useState } from "react";
import { IonContent, IonGrid, IonPage, IonSearchbar } from "@ionic/react";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg";
import styled from "styled-components/macro";
import { useAllSubjects } from "../hooks/subjects/useAllSubjects";

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
  const [searchInput, setSearchInput] = useState("");

  const {
    isLoading: allSubjectsLoading,
    data: allSubjectsData,
    error: allSubjectsErr,
  } = useAllSubjects();

  // TODO: use slugs to get info? Or just get and cache data for a longgggggg time

  return (
    <Page>
      <>
        <IonContent>
          <>
            <SearchBar
              debounce={1000}
              searchIcon={SearchIcon}
              clearIcon={ClearIcon}
              placeholder="Search Icon"
            ></SearchBar>
          </>
          <IonGrid>
            <p>Search Page - TO DO</p>
          </IonGrid>
        </IonContent>
      </>
    </Page>
  );
};
