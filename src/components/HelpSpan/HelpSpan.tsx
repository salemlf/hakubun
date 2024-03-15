import { useState } from "react";
import PopoverContent, { PopoverRoot, PopoverTrigger } from "../Popover";
import styled from "styled-components";

const ContainerSpan = styled.span`
  display: inline-block;
  cursor: help;
  padding-right: 3px;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 4px;
`;

const QuestionMark = styled.span`
  display: inline-block;
  font-size: 1.125em;
  font-weight: 700;
  color: var(--ion-color-tertiary);
  transform: translate(10%, -30%);
  background-color: transparent;
  /* creates text outline */
  text-shadow:
    1px 1px 0 black,
    -1px 1px 0 black,
    -1px -1px 0 black,
    1px -1px 0 black;
`;

const ClickableHelp = styled.button`
  all: unset;
  color: var(--text-color);
  &:focus-visible {
    outline: 2px solid white;
  }
`;

const HelpContentWrapper = styled.div`
  padding: 20px;
  max-width: 260px;
`;

type Props = {
  children: React.ReactNode;
  helpPopoverContents: React.ReactNode;
};

function HelpSpan({ children, helpPopoverContents }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContainerSpan>
      <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <ClickableHelp>
            {children}
            <QuestionMark>?</QuestionMark>
          </ClickableHelp>
        </PopoverTrigger>
        <PopoverContent isOpen={isOpen} showBorder={true}>
          <HelpContentWrapper>{helpPopoverContents}</HelpContentWrapper>
        </PopoverContent>
      </PopoverRoot>
    </ContainerSpan>
  );
}

export default HelpSpan;
