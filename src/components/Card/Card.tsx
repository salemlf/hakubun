import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  title?: string;
};

const CardContainer = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: var(--light-greyish-purple);
  border-radius: 4px;
  color: white;
`;

const TitleContainer = styled.div`
  font-size: 1.5rem;
`;

const CardContent = styled.div`
  font-size: 1rem;
`;

function Card({ children, title }: Props) {
  return (
    <CardContainer>
      {title && <TitleContainer>{title}</TitleContainer>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
