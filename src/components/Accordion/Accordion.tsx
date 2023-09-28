import React, { forwardRef, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { AccordionItemData } from "../../types/MiscTypes";
import PlusIcon from "../../images/plus.svg";
import MinusIcon from "../../images/minus.svg";
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
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
  justify-items: end;

  &:focus-visible {
    outline: 2px solid white;
  }
`;

const TriggerHeader = styled(AccordionPrimitive.Header)`
  margin: 10px 0;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  color: white;
`;

const ShowOrHideIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
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
            <ShowOrHideIcon src={isOpen ? MinusIcon : PlusIcon} />
          </motion.div>
        </AnimatePresence>
      </Trigger>
    </TriggerHeader>
  )
);

const Content = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 15px;
  color: white;
  background-color: var(--light-grey);

  a {
    color: var(--ion-color-primary-lightest);
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
  background-color: var(--light-grey);
`;

type ItemProps = {
  isOpen: boolean;
  value: string;
  title: string;
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
