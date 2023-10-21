import styled from "styled-components";
import { Header } from "../../styles/BaseStyledComponents";
import BackButton from "../BackButton";

const StyledHeader = styled(Header)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 23px 5px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.5rem;
`;

type Props = {
  title: string;
  bgColor?: string;
};

function PageHeader({ title, bgColor = "var(--light-greyish-purple)" }: Props) {
  return (
    <StyledHeader bgcolor={bgColor}>
      <BackButton />
      <Title>{title}</Title>
    </StyledHeader>
  );
}

export default PageHeader;
