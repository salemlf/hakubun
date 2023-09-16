import React from "react";
import styled from "styled-components";
import PopoverContent, { PopoverRoot, PopoverTrigger } from "../Popover";

const ContainerSpan = styled.span`
  display: inline-block;
  cursor: help;
  padding-right: 3px;
`;

const QuestionMark = styled.button`
  display: inline-block;
  font-size: 1em;
  font-weight: 700;
  color: var(--ion-color-tertiary);
  transform: translate(10%, -30%);
  background-color: transparent;
`;

type Props = {
  children: React.ReactNode;
  helpPopoverContents: React.ReactNode;
};

function HelpSpan({ children, helpPopoverContents }: Props) {
  return (
    <ContainerSpan>
      {children}
      <PopoverRoot>
        <PopoverTrigger asChild>
          <QuestionMark>?</QuestionMark>
        </PopoverTrigger>
        <PopoverContent>{helpPopoverContents}</PopoverContent>
      </PopoverRoot>
    </ContainerSpan>
  );
}

export default HelpSpan;
