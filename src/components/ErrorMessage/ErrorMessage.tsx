import SvgIcon from "../SvgIcon";
import ErrorIcon from "../../images/error.svg?react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  gap: 0 5px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  flex-wrap: wrap;
`;

function ErrorMessage() {
  return (
    <ErrorContainer>
      <p>Error loading data</p>
      <SvgIcon icon={<ErrorIcon />} width="1.75em" height="1.75em" />
    </ErrorContainer>
  );
}

export default ErrorMessage;
