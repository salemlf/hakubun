import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/react";
import styled from "styled-components/macro";

const Card = styled(IonCard)`
  margin: 0;
`;

const CardTitle = styled(IonCardTitle)`
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const CardContent = styled(IonCardContent)`
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  padding-bottom: 12px;

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

interface Props {
  children?: React.ReactNode;
  title?: string;
  isLoading: boolean;
}

// TODO: modify so just custom html and css
function BasicCard({ children, title, isLoading }: Props) {
  return (
    <Card>
      {title && (
        <IonCardHeader>
          {!isLoading ? (
            <CardTitle>{title}</CardTitle>
          ) : (
            <CardTitle>
              <IonSkeletonText
                animated={true}
                style={{ height: "20px" }}
              ></IonSkeletonText>
            </CardTitle>
          )}
        </IonCardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default BasicCard;
