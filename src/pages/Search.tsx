import { IonContent, IonGrid, IonPage, IonSearchbar } from "@ionic/react";
import styled from "styled-components/macro";
import SearchIcon from "../images/search.svg";
import ClearIcon from "../images/clear.svg";

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
