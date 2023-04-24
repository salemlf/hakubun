import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

interface Props {
  cardTitle?: string;
}

export const SubjectsCard = ({ cardTitle }: Props) => {
  return (
    <IonCard style={styles.card}>
      <IonCardHeader>
        <IonCardTitle style={styles.cardText}>{cardTitle}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent style={styles.cardText}>
        Here's a small text description for the card content. Nothing more,
        nothing less.
      </IonCardContent>
    </IonCard>
  );
};

const styles = {
  card: {
    margin: 0,
  },
  cardText: {
    color: "white",
  },
};
