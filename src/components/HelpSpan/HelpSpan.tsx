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

type PunctuationProps = {
  $color: string;
};

const Punctuation = styled.span<PunctuationProps>`
  display: inline-block;
  font-size: 1.125em;
  font-weight: 700;
  color: ${({ $color }) => $color};
  transform: translate(10%, -30%);
  background-color: transparent;
  /* creates text outline */
  text-shadow:
    1px 1px 0 black,
    -1px 1px 0 black,
    -1px -1px 0 black,
    1px -1px 0 black;
  margin-left: 2px;
`;

const ClickableHelp = styled.button`
  all: unset;
  color: var(--text-color);
  &:focus-visible {
    outline: 2px solid white;
  }
`;

const HelpContentWrapper = styled.div`
  padding: 12px;
  max-width: 260px;
`;

type PunctuationType = "asterisk" | "question";
type PunctuationContent = {
  text: string;
  color: string;
};

const punctuationMap: Record<PunctuationType, PunctuationContent> = {
  asterisk: {
    text: "*",
    color: "var(--ion-color-primary-lightest)",
  },
  question: {
    text: "?",
    color: "var(--ion-color-tertiary)",
  },
};

type Props = {
  children: React.ReactNode;
  helpPopoverContents: React.ReactNode;
  punctuation?: PunctuationType;
};

function HelpSpan({
  children,
  helpPopoverContents,
  punctuation = "question",
}: Props) {
  const punctuationInfo = punctuationMap[punctuation];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContainerSpan>
      <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <ClickableHelp>
            {children}
            <Punctuation $color={punctuationInfo.color}>
              {punctuationInfo.text}
            </Punctuation>
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
