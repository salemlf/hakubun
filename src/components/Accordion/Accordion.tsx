import React, { forwardRef, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { AccordionItemData } from "../../types/MiscTypes";
import SvgIcon from "../SvgIcon";
import PlusIcon from "../../images/plus.svg?react";
import MinusIcon from "../../images/minus.svg?react";
import styled from "styled-components";

const Root = styled(AccordionPrimitive.Root)`
  display: flex;
  margin-top: 1.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .AccordionContentText {
    padding: 15px 20px;
  }
`;

type Props = {
  items: AccordionItemData[];
};

function Accordion({ items }: Props) {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Root
      type="single"
      value={value}
      onValueChange={(updatedValue) => setValue(updatedValue)}
      collapsible
    >
      {items.map((item, index) => (
        <AccordionItem
          isOpen={item.value === value}
          key={index}
          title={item.title}
          value={item.value}
        >
          {item.content}
        </AccordionItem>
      ))}
    </Root>
  );
}

const Trigger = styled(AccordionPrimitive.Trigger)`
  all: unset;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
  align-items: center;
  justify-items: flex-start;

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
`;

const TriggerHeader = styled(AccordionPrimitive.Header)`
  margin: 10px 0;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
`;

type TriggerProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

type TriggerRef = HTMLButtonElement;

export const AccordionTrigger = forwardRef<TriggerRef, TriggerProps>(
  ({ children, isOpen, ...props }, forwardedRef) => (
    <TriggerHeader>
      <Trigger {...props} ref={forwardedRef}>
        <div>{children}</div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "minus" : "plus"}
            transition={{
              type: "spring",
              duration: 0.25,
              bounce: 0.5,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <SvgIcon
              icon={isOpen ? <MinusIcon /> : <PlusIcon />}
              width="1.5em"
              height="1.5em"
            />
          </motion.div>
        </AnimatePresence>
      </Trigger>
    </TriggerHeader>
  )
);

const Content = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 1rem;
  color: var(--text-color);
  background-color: var(--secondary-foreground-color);

  a {
    color: var(--link-text-color);
  }
`;

const contentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    display: "block",
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

type ContentProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

type ContentRef = HTMLDivElement;

export const AccordionContent = forwardRef<ContentRef, ContentProps>(
  ({ children, isOpen, ...props }, forwardedRef) => (
    <Content
      {...props}
      ref={forwardedRef}
      as={motion.div}
      initial={false}
      variants={contentVariants}
      animate={isOpen ? "open" : "closed"}
    >
      {children}
    </Content>
  )
);

const Item = styled(AccordionPrimitive.Item)`
  display: flex;
  padding: 0.75rem;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  background-color: var(--secondary-foreground-color);
`;

type ItemProps = {
  isOpen: boolean;
  value: string;
  title: string | React.ReactNode;
  children: React.ReactNode;
};

type ItemRef = HTMLDivElement;

export const AccordionItem = forwardRef<ItemRef, ItemProps>(
  ({ children, isOpen, value, title, ...props }, forwardedRef) => {
    return (
      <Item value={value} {...props} ref={forwardedRef}>
        <AccordionTrigger isOpen={isOpen}>{title}</AccordionTrigger>
        <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
      </Item>
    );
  }
);

export default Accordion;
