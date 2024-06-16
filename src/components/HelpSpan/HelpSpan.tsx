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
  transform: translate(10%, -10%);
  background-color: transparent;
  /* creates text outline */
  text-shadow:
    1px 1px 0 black,
    -1px 1px 0 black,
    -1px -1px 0 black,
    1px -1px 0 black;
  margin-left: 2px;
`;

type ClickableHelpProps = {
  $isBold: boolean;
  $hidePunctuation: boolean;
};

const ClickableHelp = styled.button<ClickableHelpProps>`
  all: unset;
  color: var(--text-color);
  font-weight: ${({ $isBold }) => ($isBold ? "600" : "400")};

  display: ${({ $hidePunctuation }) => $hidePunctuation && "flex"};
  align-items: ${({ $hidePunctuation }) => $hidePunctuation && "center"};

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
`;

const Popover = styled(PopoverContent)`
  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
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
  hidePunctuation?: boolean;
  punctuation?: PunctuationType;
  isBold?: boolean;
};

function HelpSpan({
  children,
  helpPopoverContents,
  hidePunctuation = false,
  punctuation = "question",
  isBold = false,
}: Props) {
  const punctuationInfo = punctuationMap[punctuation];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContainerSpan>
      <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <ClickableHelp $isBold={isBold} $hidePunctuation={hidePunctuation}>
            {children}
            {!hidePunctuation && (
              <Punctuation $color={punctuationInfo.color}>
                {punctuationInfo.text}
              </Punctuation>
            )}
          </ClickableHelp>
        </PopoverTrigger>
        <Popover isOpen={isOpen} showBorder={true}>
          <HelpContentWrapper>{helpPopoverContents}</HelpContentWrapper>
        </Popover>
      </PopoverRoot>
    </ContainerSpan>
  );
}

export default HelpSpan;
